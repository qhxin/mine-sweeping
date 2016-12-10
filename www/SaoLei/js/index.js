(function(){
    'use strict';

    var Main = React.createClass({

        getInitialState: function(){
            return {
                'level': 1
            };
        },
        render: function(){
            let width, height;
            if(this.state.level==2){
                width = 500;
                height = 400;
            }else
            if(this.state.level==3){
                width = 600;
                height = 500;
            }else{
                width = 300;
                height = 400;
            }

            return (
                <div className="sl-main" style={{ 'width': width, 'height': height, 'margin-top': -(height/2),'margin-left':-(width/2) }}>
                    <div className="sl-title"></div>
                </div>
            );
        }
    });

    var mainEle = document.getElementById('Main');
    ReactDOM.render(<Main/>, mainEle);
})();