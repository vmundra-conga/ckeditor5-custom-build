/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module find-and-replace/ui/checkbox/checkboxview
 */

import { View } from 'ckeditor5/src/ui';

export default class CheckboxView extends View {
	/**
	 * @inheritDoc
	 */
	constructor( locale ) {
		super( locale );

		const bind = this.bindTemplate;

		// Implement the Checkbox interface.
		this.set( 'class' );
		this.set( 'isEnabled', true );
		this.set( 'isVisible', true );
		this.set( 'isChecked', false );
		this.set( 'label' );
		this.set( 'checkboxId' );
		this.set( 'tabindex', -1 );

		/**
		 * Collection of the child views inside of the checkbox {@link #element}.
		 *
		 * @readonly
		 * @member {module:ui/viewcollection~ViewCollection}
		 */
		this.children = this.createCollection();

		/**
		 * Label of the checkbox view. It is configurable using the {@link #label label attribute}.
		 *
		 * @readonly
		 * @member {module:ui/view~View} #labelView
		 */
		this.labelView = this._createLabelView( );

		this.setTemplate( {
			tag: 'div',

			attributes: {
				class: [
					'ck-find-checkboxes__box',
					bind.to( 'class' ),
					bind.if( 'isEnabled', 'ck-disabled', value => !value ),
					bind.if( 'isVisible', 'ck-hidden', value => !value )
				],
				type: bind.to( 'type', value => value ? value : 'checkbox' ),
				tabindex: bind.to( 'tabindex' ),
				'aria-disabled': bind.if( 'isEnabled', true, value => !value )
			},

			children: [
				{
					tag: 'input',
					attributes: {
						type: 'checkbox',
						id: bind.to( 'checkboxId' ),
						name: bind.to( 'label' ),
						value: bind.to( 'label' )
					}
				},
				this.labelView
			]
		} );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		this.children.add( this.labelView );
	}

	/**
	 * Focuses the {@link #element} of the checkbox.
	 */
	focus() {
		this.element.focus();
	}

	/**
	 * Creates a label view instance and binds it with checkbox attributes.
	 *
	 * @private
	 * @returns {module:ui/view~View}
	 */
	_createLabelView() {
		const labelView = new View();

		labelView.setTemplate( {
			tag: 'label',

			attributes: {
				for: this.bindTemplate.to( 'checkboxId' )
			},

			children: [
				{
					text: this.bindTemplate.to( 'label' )
				}
			]
		} );

		return labelView;
	}
}
