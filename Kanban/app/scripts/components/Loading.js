import React, {Component} from 'react';
import jQuery from 'jquery';
import {connect} from 'react-redux';

/**
 * 页面的等待窗体，在数据加载的时候应用
 */
var waitingDialog = waitingDialog || (function ($) {
    'use strict';
	var $dialog = $(
		'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
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
				onHide: null
			}, options);

			$dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
			$dialog.find('.progress-bar').attr('class', 'progress-bar');
			if (settings.progressType) {
				$dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
			}
			$dialog.find('h3').text(message);

			// Adding callbacks
			if (typeof settings.onHide === 'function') {
				$dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
					settings.onHide.call($dialog);
				});
			}
			$dialog.modal();
		},

		hide: function () { $dialog.modal('hide'); }
	};

})(jQuery);


class Comp extends Component {
    componentWillMount() {
        if(this.props.loaders > 0) {
            waitingDialog.show('数据加载中，请稍后........');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.show = (nextProps.loaders > 0)) {
            waitingDialog.show('数据加载中，请稍后........');
        } else {
            setTimeout(() => waitingDialog.hide(), 500);
        }
    }

    componentWillUnmount() { waitingDialog.hide(); }

    render() {
        return ( <div></div> )
    }
}

export default connect((state, ownProps) => ({
    loaders: state.LoaderReducer.loaders
}))(Comp);
