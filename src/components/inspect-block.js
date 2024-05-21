/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { Notice, Button } from '@wordpress/components';
import { useCopyToClipboard } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import CopyCode from '../icons/CopyCode';

export default function InspectBlock() {

	const currentBlockAttributes  = wp.data.select( 'core/block-editor' ).getSelectedBlock();
	const { createSuccessNotice } = useDispatch( noticesStore );

	const codebase = JSON.stringify( currentBlockAttributes, null, 2 );
	const copyRef  = useCopyToClipboard( codebase, () => {
		createSuccessNotice( __( 'Code Copied!', 'inspect-block-data' ), {
			type: 'snackbar',
			isDismissible: true,
			icon: <CopyCode />,
		} );
	} );

	const inspectStyle = {
		width: '100%',
		display: 'flex',
		padding: '6px',
		margin: 0,
		overflow: 'auto',
		overflowY: 'hidden',
		fontSize: '12px',
		lineHeight: '20px',
		background: '#3a3a3a',
		color: '#f2dede',
	}

	const copyCodeBtnStyle = {
		display: 'inline-flex',
		position: 'absolute',
		padding: 'inherit',
		right: '20px',
	}
	
	return (
		<Fragment>
		{ ! currentBlockAttributes
			? 
			<Notice status="info">
				{ __( 'No block is selected.', 'inspect-block-data' ) }
			</Notice>
			:
			<pre className='inspect-data-wrapper' style={ inspectStyle }>
				<code>
					{ codebase }
				</code>
				<Button
					icon={ <CopyCode /> }
					variant="primary"
					label={ __( 'Copy code', 'inspect-block-data' ) }
					showTooltip={ true }
					iconSize={ 20 }
					style={ copyCodeBtnStyle }
					ref={ copyRef }
				/>
			</pre>
		}
		</Fragment>
	);
}