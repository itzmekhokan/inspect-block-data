/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import InspectBlock from './components/inspect-block';
import InspectIcon from './icons/InspectIcon';

const InspectBlockDataComponent = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { isSelected } = props;

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected &&  
					<InspectorControls key="inspect-block-data">
						<PanelBody
							icon={ <InspectIcon/> }
							title={ __( 'Inspect Block Data', 'inspect-block-data' ) }
							initialOpen={ true }
						>
							<InspectBlock />
						</PanelBody>
					</InspectorControls>
				}
			</Fragment>
		);
	};
}, 'InspectBlockDataComponent' );

addFilter(
	'editor.BlockEdit',
	'inspect-block-data-control',
	InspectBlockDataComponent
);
