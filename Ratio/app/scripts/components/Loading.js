import React, {Component} from 'react';
import jQuery from 'jquery';
import {connect} from 'react-redux';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.waitingDialog = (function ($) {
        	var $dialog = $(
        		'<div class="modal fade mydialog" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
        		'<div class="modal-dialog modal-m">' +
        		'<div class="modal-content">' +
        			'<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
        			'<div class="modal-body">' +
        				'<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
        			'</div>' +
        		'</div></div></div>');

        	return {
        		show: function (message, options) {
        			// Assigning defaults
        			if (typeof options === 'undefined') { options = {}; }
        			if (typeof message === 'undefined') { message = 'Loading'; }
        			var settings = $.extend({
        				dialogSize: 'm',
        				progressType: '',
                        modal: false
        			}, options);

        			$dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
        			$dialog.find('.progress-bar').attr('class', 'progress-bar');
        			if (settings.progressType) {
        				$dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
        			}
        			$dialog.find('h3').text(message);

        			setTimeout(() => {$dialog.modal(); $(document.body).css({paddingRight: "0", overflowY: 'auto'})}, 10);
        		},
        		hide: function () { $dialog.modal('hide'); $(document.body).css({})}
        	};

        })(jQuery);
    }

    componentWillReceiveProps(nextProps) {
        // 如果等待窗已经开启，则不需要重复开启
        if(this.show && nextProps.loaders > 0) { return; }

        if((this.show = nextProps.loaders > 0)) {
            this.waitingDialog.show('数据加载中，请稍后........');
        } else {
            setTimeout(() => this.waitingDialog.hide(), 500);
        }
    }

    componentWillUnmount() { this.waitingDialog.hide(); this.waitingDialog = null; }

    render() {
        return ( <div></div> )
    }
}

export default connect((state, ownProps) => ({
    loaders: state.LoaderReducer.loaders
}))(Comp);
