import React from 'react';
import Header from './Header';
import Order from './Order';
import MenuAdmin from './MenuAdmin';
import Burger from './Burger';
import sampleBurgers from '../sample-burgers';

class App extends React.Component {
	state = {
		burgers: {},
		order: {},
	}

	addBurger = burger => {
		const burgers = { ...this.state.burgers } // Copy object
		burgers[`burger${Date.now()}`] = burger // Add burger to obj.burgers
		this.setState({ burgers }); // write to state
	}

	loadSampleBurgers = () => {
		this.setState({ burgers: sampleBurgers });
	}

	addToOrder = (key) => {
		//1.	Копируем объект стейт
		const order = this.state.order;
		//2. добавить ключ к заказу со значением 1 либо обновить значение
		order[key] = order[key] + 1 || 1;
		//3. Записываем order в state
		this.setState({ order })
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
				/>
				<MenuAdmin
					addBurger={this.addBurger}
					loadSampleBurgers={this.loadSampleBurgers}
				/>
			</div>
		)
	}
}

export default App;