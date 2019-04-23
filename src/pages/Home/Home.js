import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHelmet from 'react-helmet';
import injectSheet from 'react-jss';
import { withTranslation } from 'react-i18next';
import styles from './styles';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

@withTranslation()
@injectSheet(styles)
@observer
export default class Home extends Component {
  static propTypes = {
    route: PropTypes.string,
    t: PropTypes.func.isRequired,
  };
  @observable inputValue = '';

  @action
  handleInputChange = e => {
    this.inputValue = e.target.value;
  };

  @action
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.store.addValue(this.inputValue);
    this.inputValue = '';
    document.getElementById('input').value = '';
  };
  render() {
    const {
      route,
      classes,
      t,
      store
    } = this.props;
    console.log(store);
    return (
      <div>
        <ReactHelmet
          title="Home screen"
        />
        <div className={classes.title}>
          {t('home:homeTitle')}
        </div>
        {route}
        <form onSubmit={this.handleFormSubmit}>
          New Input:
          <input
            id="input"
            type="text"
            value={this.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.props.store.values.map((value, index) => (
            <p key={index}>{value}</p>
          ))}
        </ul>
        InputsCount: {store.valuesCount}
      </div>
    );
  }
}
