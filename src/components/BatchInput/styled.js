import styled from 'styled-components';
import X from 'react-feather/dist/icons/x';

export const CloseX = styled(X).attrs({
	size: 16,
	title: 'Discard Item'
})`
	margin-left: 5px;
	cursor: pointer;
	padding: 3px;
	stroke-width: 4px;
	background: #369;
	color: #fff;
	border-radius: 50%;
	transition: all .25s ease-in-out;

	.has-selection & {
		opacity: 0.25 !important;
	}
`

export const InputItem = styled.span`
	display: inline-block;
	border: 1px solid rgba(51, 102, 153, 0.125);
	border-radius: calc((1rem + 12px) / 2);
	padding: 3px 4px 4px 7px;
	margin: 5px;
	line-height: 1;
	background: rgba(51, 102, 153, 0.075);
	color: #369;
	user-select: none;
	transition: all .25s ease-in-out;
	cursor: pointer;

	& > span.item-label, & > .item-x {
		display: inline;
		vertical-align: middle;
		position: relative;
	}

	& > span.item-label {
		font-weight: 600;
		font-size: 0.8rem;
		letter-spacing: 1px;
	}

	&:hover {
		background: rgba(51, 102, 153, 0.15);
		border-color: rgba(51, 102, 153, 0.15);
	}
	
	&.item-selected {
		background: #369 !important;
		border-color: #369 !important;
		color: #fff !important;

		& > .item-x {
			opacity: 0.25 !important;
		}
	}
`

export const InputField = styled.input.attrs({
	autoFocus: true,
	type: 'text',
	autoComplete: 'off',
	className: 'form-control'
})`
	border: 0 !important;
	flex: 100 1 auto;
	outline: none !important;
	box-shadow: none !important;
	display: inline-block;
	position: relative;
	padding: 3px 3px 4px 7px !important;
	margin: 5px !important;
	height: auto;
	width: 0 !important;
	min-width: 150px !important;
	font-weight: 600;
	font-size: 0.8rem !important;
	letter-spacing: 1px;
	appearance: textfield;
	cursor: text;
	caret-color: rgba(51, 102, 153, 0.75);

	&::placeholder {
		color: rgba(51, 102, 102, 0.375);
		letter-spacing: 0;
		font-weight: 400;
	}
`

export const BatchInput = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-items: flex-start;
	align-content: flex-start;
	width: 42.5%;
	margin: 50px auto;
	padding: 5px 10px;
	border: 1px solid rgba(51, 102, 153, 0.25);
	border-radius: 5px;
	${'' /* max-height: 70px; */}
	box-shadow: 0 1px 10px 0 rgba(17, 34, 51, 0.1);
	position: relative;
	overflow-y: hidden;
`
