import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddBurgerForm extends Component {

	static propTypes = {
		addBurger: PropTypes.func,
	}

	nameRef = React.createRef();
	priceRef = React.createRef();
	statusRef = React.createRef();
	descRef = React.createRef();
	imgRef = React.createRef();


	createBurger = (event) => {
		event.preventDefault();
		const burger = {
			name: this.nameRef.current.value,
			price: +this.priceRef.current.value,
			status: this.statusRef.current.value,
			desc: this.descRef.current.value,
			img: this.imgRef.current.value,
		}
		this.props.addBurger(burger);
		event.currentTarget.reset();
	};

	render() {
		return (
			<form action="" className='burger-edit' onSubmit={this.createBurger}>
				<input type="text" ref={this.nameRef} name="name" placeholder='Name' autoComplete='off' />
				<input type="number" ref={this.priceRef} name="price" placeholder='Price' autoComplete='off' />
				<select name="status" ref={this.statusRef} className='status'>
					<option value="available">Доступно</option>
					<option value="unavailable">Не доступно</option>
				</select>
				<textarea name="desc" ref={this.descRef} placeholder='Description' />
				<input type="text" ref={this.imgRef} name="img" placeholder='Img' autoComplete='off' />
				<button type="submit">Добавить в Меню</button>
			</form>
		);
	}
}

export default AddBurgerForm;