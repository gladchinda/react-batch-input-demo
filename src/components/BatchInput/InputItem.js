import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

const InputItem = ({ children, className, onDiscardItem, onToggleSelectItem }) => {
	return typeof children === 'string' && children.trim() && (
		<Styled.InputItem className={className} onClick={onToggleSelectItem}>
			<span className="item-label">{ children }</span>
			<Styled.CloseX className="item-x" onClick={onDiscardItem} />
		</Styled.InputItem>
	)
}

InputItem.propTypes = {
	children: PropTypes.string.isRequired
};

export default InputItem;
