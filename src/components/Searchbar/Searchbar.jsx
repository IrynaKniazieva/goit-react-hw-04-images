import React from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { GoSearch } from 'react-icons/go';
// import { toast } from 'react-toastify';

class Searchbar extends React.Component {
  state = {
    query: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func,
  };

  handleSearchQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSearchQuerySubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Enter a valid name');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={styles.searchbar}>
        <form
          className={styles.formHeader}
          onSubmit={this.handleSearchQuerySubmit}
        >
          <button className={styles.buttonHeader} type="submit">
            <GoSearch />
          </button>

          <input
            className={styles.inputHeader}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleSearchQueryChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
