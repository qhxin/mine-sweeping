$(document).ready(function($){
    'use strict';

    let leiSize = 20;

    let Lei = React.createClass({
        getInitialState(){
            return {
                hasLei: (this.props.Lei===true),
                roundN: this.props.RD,
                sR: this.props.sR,
                opened: false
            }
        },
        componentWillReceiveProps(nextProps){
            if(nextProps.sR != this.props.sR){
                this.setState({
                    sR: nextProps.sR,
                    opened: false
                });
            }
        },
        handlerClickLeft(){
            if(!this.state.opened){
                this.setState({
                    opened: true
                });
            }
        },
        handlerClickRight(e){
            e.preventDefault();
            e.stopPropagation();
            console.log(1)
        },
        render(){
            let show_num = '',
                classes = 'sl-lei';
            if(this.state.opened){
                classes += ' open';
                if(this.state.hasLei){
                    show_num = 'X';
                }else{
                    show_num = this.state.roundN;
                    if(show_num>0 && show_num<=2){
                        classes += ' blue';
                    }else
                    if(show_num>2 && show_num<=4){
                        classes += ' orange';
                    }else
                    if(show_num>4 && show_num<=6){
                        classes += ' red';
                    }else
                    if(show_num>6 && show_num<=8){
                        classes += ' yellow';
                    }else
                    if(show_num==0){
                        show_num = '';
                    }
                }
            }

            return (
                <div className={classes}
                    style={{ left: this.props.sLeft, top: this.props.sTop}}
                    onClick={this.handlerClickLeft}
                    onContextMenu={this.handlerClickRight}>{show_num}</div>
            );
        }
    });

    let Box = React.createClass({
        caculateSth(props){
            let w = props.boxWidth,
                h = props.boxHeight,
                col = parseInt(w/leiSize, 10),
                row = parseInt(h/leiSize, 10),
                num = col*row,
                limit = num*props.LPer/100;

            props.handlerSetCount(0, limit);

            let leiMap = ((limit, num, col, row)=>{
                var aLuanXu=[];

                for (let i = 0; i < num; i++) {
                    aLuanXu[i] = i<limit;
                }
                for (let i = 0; i < num; i++) {
                    var iRand = parseInt(num * Math.random());
                    var temp = aLuanXu[i];
                    aLuanXu[i] = aLuanXu[iRand];
                    aLuanXu[iRand] = temp;
                }
                let lei_map = {}, col_i, row_i;
                let searchRound = (map, is_lei, row_i, col_i, row, col)=>{
                    let num = 0;
                    if(row_i+1<row && col_i+1<col){
                        num += map[row_i+1][col_i+1]?1:0;
                    }
                    if(row_i+1<row){
                        num += map[row_i+1][col_i]?1:0;
                    }
                    if(row_i+1<row && col_i-1>0){
                        num += map[row_i+1][col_i-1]?1:0;
                    }
                    if(col_i+1<col){
                        num += map[row_i][col_i+1]?1:0;
                    }
                    if(col_i-1>0){
                        num += map[row_i][col_i-1]?1:0;
                    }
                    if(row_i-1>0 && col_i+1<col){
                        num += map[row_i-1][col_i+1]?1:0;
                    }
                    if(row_i-1>0){
                        num += map[row_i-1][col_i]?1:0;
                    }
                    if(row_i-1>0 && col_i-1>0){
                        num += map[row_i-1][col_i-1]?1:0;
                    }
                    return num;
                };
                for (let i=0,l=aLuanXu.length; i<l; i++){
                    col_i = i%col;
                    row_i = Math.floor(i/col);
                    if(lei_map[row_i]){
                        lei_map[row_i][col_i] = aLuanXu[i];
                    }else{
                        lei_map[row_i] = {};
                        lei_map[row_i][col_i] = aLuanXu[i];
                    }
                }
                let MP = {}, tmp_v;
                for(row_i in lei_map){
                    if(lei_map.hasOwnProperty(row_i)){
                        for(col_i in lei_map[row_i]){
                            if(lei_map[row_i].hasOwnProperty(col_i)){
                                tmp_v = {
                                    'isLei': lei_map[row_i][col_i],
                                    'roundNum': searchRound(lei_map, lei_map[row_i][col_i], parseInt(row_i, 10), parseInt(col_i, 10), row, col)
                                };
                                if(MP[row_i]){
                                    MP[row_i][col_i] = tmp_v;
                                }else{
                                    MP[row_i] = {};
                                    MP[row_i][col_i] = tmp_v;
                                }
                            }
                        }
                    }
                }
                return MP;
            })(limit, num, col, row);

            return {
                num: num,
                col: col,
                row: row,
                leiMap: leiMap
            };
        },
        getInitialState(){
            let state = {};

            let prl = this.caculateSth(this.props);

            return $.extend(state, prl, true);
        },
        componentWillReceiveProps(nextProps){
            this.setState(this.caculateSth(nextProps));
        },
        render(){

            let lei = [];
            for(let i in this.state.leiMap){
                if(this.state.leiMap.hasOwnProperty(i)){
                    let lei_line = this.state.leiMap[i];
                    for(let j in lei_line){
                        if(lei_line.hasOwnProperty(j)){
                            lei.push(<Lei sR={Math.random()} sX={j} sY={i} Lei={lei_line[j].isLei} RD={lei_line[j].roundNum} sLeft={j*leiSize} sTop={i*leiSize}/>);
                        }
                    }
                }
            }

            return (
                <div className="sl-box" style={{width: this.state.w, height: this.state.h}}>
                {lei}
                </div>
            );
        }
    });

    let Main = React.createClass({
        getInitialState(){
            return {
                level: 1,
                all_count: 0,
                find_count: 0
            };
        },
        handlerSelectLevel(e){

            this.setState({
                level: parseInt(e.target.value, 10)
            })
        },
        handlerSetCount(find, all){

            this.setState({
                all_count: all||0,
                find_count: find||0
            })
        },
        render(){

            let level_map = {
                    1: { n:'初级', w:300, h:400, per: 15},    //300   0.15
                    2: { n:'中级', w:500, h:400, per: 30},    //500   0.3
                    3: { n:'高级', w:600, h:500, per: 60}     //750   0.6
                };

            let b_width = level_map[this.state.level].w,
                b_height = level_map[this.state.level].h,
                b_per = level_map[this.state.level].per;

            let width = b_width+8,
                height = b_height+40;

            let levels_select_opt = [];
            for(let le in level_map){
                if(level_map.hasOwnProperty(le)){
                    levels_select_opt.push(<option value={le}>{level_map[le].n}</option>);
                }
            }

            return (
                <div className="sl-main" style={{ 'width': width, 'height': height, 'margin-top': -(height/2),'margin-left':-(width/2) }}>
                    <div className="sl-title">
                        <span>扫雷</span>
                        <span> | </span>
                        <select className="sl-level-select" defaultValue={this.state.level} onChange={this.handlerSelectLevel}>{levels_select_opt}</select>
                        <span> | </span>
                        <span>{this.state.find_count}:{this.state.all_count}</span>
                        <span> | </span>
                        <span><input type="button" value="重置"/></span>
                    </div>
                    <Box boxWidth={b_width} boxHeight={b_height} LPer={b_per} handlerSetCount={this.handlerSetCount}/>
                </div>
            );
        }
    });

    ReactDOM.render(<Main/>, document.getElementById('Main'));
});