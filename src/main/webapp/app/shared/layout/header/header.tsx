import './header.scss';

import React from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { InscriptionsMenu } from 'app/shared/layout/menus/inscriptions';
import { ScolariteMenu } from 'app/shared/layout/menus/scolarite';
import { EspaceProfMenu } from 'app/shared/layout/menus/espaceprofesseur';
import { ConfigurationMenu } from 'app/shared/layout/menus/configuration';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    this.props.onLocaleChange(langKey);
  };

  renderDevRibbon = () =>
    this.props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${this.props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { currentLocale, isAuthenticated, isAdmin, isSwaggerEnabled, isInProduction } = this.props;

    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

    return (
      <div id="app-header">
        <LoadingBar className="loading-bar" />
        <Navbar light expand="sm" fixed="top" className="bg-light">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              <div className="pull-left image">
                <img src="content/images/ostelea.png" className="img-circle" alt="User Image" />
              </div>
              <Home />
              {isAuthenticated && <InscriptionsMenu />}
              {isAuthenticated && <ScolariteMenu />}
              {isAuthenticated && <EspaceProfMenu />}
              {isAuthenticated && isAdmin && <ConfigurationMenu />}
              {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} showDatabase={!isInProduction} />}
              <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
              <AccountMenu isAuthenticated={isAuthenticated} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
