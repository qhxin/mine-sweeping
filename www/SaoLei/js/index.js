(function(){
    'use strict';

    let Box = React.createClass({
        getInitialState: function(){
            let w = this.props.boxWidth,
                h = this.props.boxHeight;

            return {
                num: parseInt(h*w/400, 10)
            };
        },

        render: function(){

            let lei = [];

            for(let i=0; i< this.state.num; i++){
                lei.push(<div className="sl-lei"></div>);
            }

            return (
                <div className="sl-box" style={{width: this.state.w, height: this.state.h}}>
                {lei}
                </div>
            );
        }

    });

    let Main = React.createClass({
        getInitialState: function(){
            return {
                level: 1
            };
        },
        handlerSelectLevel: function(e){

            this.setState({
                level: parseInt(e.target.value, 10)
            })
        },
        render: function(){

            let level_map = {
                    1: { n:'菜鸟', w:300, h:400},
                    2: { n:'高手', w:500, h:400},
                    3: { n:'传奇', w:600, h:500}
                };

            let b_width = level_map[this.state.level].w,
                b_height = level_map[this.state.level].h;

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
                    </div>
                    <Box boxWidth={b_width} boxHeight={b_height}/>
                </div>
            );
        }
    });

    ReactDOM.render(<Main/>, document.getElementById('Main'));
})();