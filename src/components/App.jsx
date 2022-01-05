import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import MenuAdmin from './MenuAdmin';
import Burger from './Burger';
import sampleBurgers from '../sample-burgers';
import base from '../base';
class App extends React.Component {

	static propTypes = {
		match: PropTypes.object,
	}

	state = {
		burgers: {},
		order: {},
	}

	componentDidMount() {
		const { params } = this.props.match;

		const localStorageRef = localStorage.getItem(params.restaurantId)
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) })
		};

		this.ref = base.syncState(`${params.restaurantId}/burgers`, {
			context: this,
			state: 'burgers',
		});
	}

	componentDidUpdate() {
		const { params } = this.props.match;

		localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
	}

	componentWillUnmount() {
		base.removeBinding(this.ref)
	}

	addBurger = burger => {
		const burgers = { ...this.state.burgers } // Copy object
		burgers[`burger${Date.now()}`] = burger // Add burger to obj.burgers
		this.setState({ burgers }); // write to state
	}

	updateBurger = (key, updatedBurger) => {
		const burgers = { ...this.state.burgers } // Copy object
		burgers[key] = updatedBurger; // Updating current burger
		this.setState({ burgers });// Write to state
	}

	deleteBurger = key => {
		const burgers = { ...this.state.burgers } // Copy object
		burgers[key] = null;// Delete burger
		this.setState({ burgers }); // Write to state
	}

	loadSampleBurgers = () => {
		this.setState({ burgers: sampleBurgers });
	}

	addToOrder = (key) => {
		//1.	Копируем объект стейт
		const order = { ...this.state.order };
		//2. добавить ключ к заказу со значением 1 либо обновить значение
		order[key] = order[key] + 1 || 1;
		//3. Записываем order в state
		this.setState({ order })
	}

	deleteFromOrder = key => {
		const order = { ...this.state.order };

		if (order[key] !== 1) {
			order[key] = order[key] - 1;
			this.setState({ order });
		} else {
			delete order[key];
		}
		this.setState({ order });
	}

	render() {
		return (
			<div className="burger-paradise">
				<div className="menu">
					<Header title='Very Hot Burger' />
					<ul className="burgers">
						{Object.keys(this.state.burgers).map(key => {
							return <Burger
								key={key}
								index={key}
								addToOrder={this.addToOrder}
								details={this.state.burgers[key]}
							/>
						})}
					</ul>
				</div>
				<Order
					burgers={this.state.burgers}
					order={this.state.order}
					deleteFromOrder={this.deleteFromOrder}
				/>
				<MenuAdmin
					updateBurger={this.updateBurger}
					deleteBurger={this.deleteBurger}
					addBurger={this.addBurger}
					loadSampleBurgers={this.loadSampleBurgers}
					burgers={this.state.burgers}
				/>
			</div>
		)
	}
}

export default App;