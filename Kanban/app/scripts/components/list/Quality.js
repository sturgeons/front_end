import React, {Component} from 'react';
import {connect} from 'react-redux';
import jQuery from 'jquery';
import {Button} from 'react-bootstrap';

// 自定义模态窗
(function ($) {
    $.fn.animatedModal = function(options) {
        var modal = $(this);
        var settings = $.extend({
            modalTarget:'animatedModal',
            position:'fixed',
            width:'100%',
            height:'100%',
            top:'0px',
            left:'0px',
            zIndexIn: '9999',
            zIndexOut: '-9999',
            color: '#7daaa8',
            opacityIn:'1',
            opacityOut:'0',
            animatedIn:'zoomIn',
            animatedOut:'zoomOut',
            animationDuration:'.6s',
            overflow:'auto',
            beforeOpen: function() {},
            afterOpen: function() {},
            beforeClose: function() {},
            afterClose: function() {}
        }, options);

        var closeBt = $('.close-'+settings.modalTarget);
        var href = '#animatedModal',
            id = $('body').find('#'+settings.modalTarget),
            idConc = '#'+id.attr('id');
            id.addClass('animated');
            id.addClass(settings.modalTarget+'-off');

        var initStyles = {
            'position':settings.position,
            'width':settings.width,
            'height':settings.height,
            'top':settings.top,
            'left':settings.left,
            'background-color':settings.color,
            'overflow-y':settings.overflow,
            'z-index':settings.zIndexOut,
            'opacity':settings.opacityOut,
            '-webkit-animation-duration':settings.animationDuration
        };
        id.css(initStyles);

        modal.click(function(event) {
            event.preventDefault();
            $('body, html').css({'overflow':'hidden'});
            if (href == idConc) {
                $('#animatedModal .modal-content').html(
                    '<iframe src="/technics" width="100%" height="100%" scrolling="no" frameborder="0"/>'
                );

                if (id.hasClass(settings.modalTarget+'-off')) {
                    id.removeClass(settings.animatedOut);
                    id.removeClass(settings.modalTarget+'-off');
                    id.addClass(settings.modalTarget+'-on');
                }

                 if (id.hasClass(settings.modalTarget+'-on')) {
                    settings.beforeOpen();
                    id.css({'opacity':settings.opacityIn,'z-index':settings.zIndexIn});
                    id.addClass(settings.animatedIn);
                    id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterOpen);
                };
            }
        });

        closeBt.click(function(event) {
            event.preventDefault();
            $('body, html').css({'overflow':'auto'});

            settings.beforeClose(); //beforeClose
            if (id.hasClass(settings.modalTarget+'-on')) {
                id.removeClass(settings.modalTarget+'-on');
                id.addClass(settings.modalTarget+'-off');
            }

            if (id.hasClass(settings.modalTarget+'-off')) {
                id.removeClass(settings.animatedIn);
                id.addClass(settings.animatedOut);
                id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
            };
        });

        function afterClose () {
            id.css({'z-index':settings.zIndexOut});
            settings.afterClose(); //afterClose
        }

        function afterOpen () {
            settings.afterOpen(); //afterOpen
        }
    };
}(jQuery));

class Comp extends Component {
    render() {
        const {children} = this.props;
        return (
            <div style={{paddingLeft: '2px'}}>
                <Button bsSize='large'
                        className={"chk-dialog-btn"}
                        bsStyle="primary"
                        id="custom-modal"
                        ref={ () => $('#custom-modal').animatedModal() }>
                        {children}
                </Button>

                <div id="animatedModal">
                    <div id="btn-close-modal" className="close-animatedModal">
                        <span>检测信息录入</span>X
                    </div>

                    <div className="modal-content" style={{height: "95%"}}>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect( mapStateToProps, mapDispatchToProps )(Comp);
