import React from 'react';
import classnames from 'classnames';
import * as Styled from './styled';
import InputItem from './InputItem';

const dedupeArray = array => [ ...new Set(array) ];

export default class BatchInput extends React.Component {

	$fieldRef = React.createRef()

	state = { items: [], selected: [], current: null }

	get value() {
		return this.state.current || '';
	}

	get values() {
		return this.state.items;
	}

	handleKeyPress = evt => {
		const pressed = evt.key.toUpperCase();
		const SELECTION_KEYS = ['DELETE', 'ESCAPE'];

		if (SELECTION_KEYS.includes(pressed)) {
			evt.preventDefault();

			switch (pressed) {
				case 'ESCAPE':
					this.setState({ selected: [] }, () => this.$fieldRef.current.focus());
					break;

				case 'DELETE':
					const { items, selected } = this.state;
					const currentItems = items.filter((i, index) => !selected.includes(index));
					this.setState({ items: currentItems, selected: [] }, () => this.$fieldRef.current.focus());
					break;
			}
		}
	}

	handleInputChange = evt => {
		const current = evt.target.value;
		(/^[\s\d,]*$/.test(current)) && this.setState({ current });
	}

	handleInputKeyPress = evt => {
		const pressed = evt.key.toUpperCase();
		const COMMIT_KEYS = ['ENTER', ',', ' '];

		if (COMMIT_KEYS.includes(pressed)) {
			evt.preventDefault();
			this.commitCurrentItem();
		}
	}

	commitCurrentItem = () => {
		const { items, current } = this.state;
		const batch = current && current.split(/[,\s]/).filter(item => !!(item && item.length > 0));

		this.setState({
			current: null,
			items: [
				...items,
				...(current ? [ ...batch ] : [])
			]
		}, () => this.$fieldRef.current.focus());
	}

	removeItem = index => evt => {
		const { items, selected } = this.state;

		if (index >= 0 && index <= items.length - 1 && selected.length === 0) {
			this.setState({
				items: [
					...items.slice(0, index),
					...items.slice(index + 1)
				]
			}, () => this.$fieldRef.current.focus());
		}
	}

	toggleItemSelection = index => evt => {
		const { items, selected } = this.state;
		
		if (index >= 0 && index <= items.length - 1) {
			const jumping = typeof this.jumpSelection === 'boolean' && this.jumpSelection;
			this.jumpSelection = evt.shiftKey;

			if (jumping && this.jumpSelection) {
				const lastIndex = selected[selected.length - 1];
				const indexDiff = index - lastIndex;
				const absDiff = Math.abs(indexDiff);
				const backwards = indexDiff >= 0;

				if (absDiff >= 2) {
					const indexes = [ ...Array(absDiff) ]
						.map((n, i) => index + (i * (backwards ? -1 : 1)))
						.reverse();

					return this.setState({
						selected: dedupeArray([ ...selected, ...indexes ])
					}, () => this.$fieldRef.current.focus());
				}

				if (absDiff === 0 || selected.includes(index)) {
					return this.$fieldRef.current.focus();
				}
			}

			this.setState({
				selected: dedupeArray(
					selected.findIndex(i => i === index) >= 0
						? [ ...selected.filter(i => i !== index) ]
						: [ ...selected, index ]
				)
			}, () => this.$fieldRef.current.focus());
		}
	}

	renderItems = () => {
		const { items, selected } = this.state;
		
		return (
			<React.Fragment>
				{ items.map((item, index) => {
					const itemClass = classnames({ 'item-selected': selected.includes(index) });

					return <InputItem key={index} className={itemClass} onToggleSelectItem={this.toggleItemSelection(index)} onDiscardItem={this.removeItem(index)}>{ item }</InputItem>
				}) }
			</React.Fragment>
		)
	}

	componentDidMount() {
		this.$fieldRef.current.focus();
	}

  render() {
		const placeholder = `${this.values.length > 0 ? 'Continue' : 'Start'} typing`;
		const batchInputClass = classnames({ 'has-selection': this.state.selected.length > 0 });

    return (
			<Styled.BatchInput className={batchInputClass} onKeyDown={this.handleKeyPress}>
				{ this.renderItems() }
				<Styled.InputField ref={this.$fieldRef} value={this.value} placeholder={placeholder} onKeyDown={this.handleInputKeyPress} onChange={this.handleInputChange} />
			</Styled.BatchInput>
    )
  }
}
