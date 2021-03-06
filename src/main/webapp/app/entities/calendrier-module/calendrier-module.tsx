import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './calendrier-module.reducer';
import { ICalendrierModule } from 'app/shared/model/calendrier-module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICalendrierModuleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICalendrierModuleState {
  search: string;
}

export class CalendrierModule extends React.Component<ICalendrierModuleProps, ICalendrierModuleState> {
  state: ICalendrierModuleState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.setState({ search: '' }, () => {
      this.props.getEntities();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { calendrierModuleList, match } = this.props;
    return (
      <div>
        <h2 id="calendrier-module-heading">
          Calendrier des modules
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.calendrierModule.home.createLabel">Create new Calendrier Module</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('pfumv10App.calendrierModule.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          {calendrierModuleList && calendrierModuleList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="pfumv10App.calendrierModule.dateControlContinu1">Date Control Continu 1</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.calendrierModule.dateControlContinu2">Date Control Continu 2</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.calendrierModule.module">Module</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.calendrierModule.anneeInscription">Annee Inscription</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {calendrierModuleList.map((calendrierModule, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${calendrierModule.id}`} color="link" size="sm">
                        {calendrierModule.id}
                      </Button>
                    </td>
                    <td>{calendrierModule.libelle}</td>
                    <td>
                      <TextFormat type="date" value={calendrierModule.dateControlContinu1} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={calendrierModule.dateControlContinu2} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      {calendrierModule.module ? (
                        <Link to={`module/${calendrierModule.module.id}`}>{calendrierModule.module.nomModule}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {calendrierModule.anneeInscription ? (
                        <Link to={`annee-inscription/${calendrierModule.anneeInscription.id}`}>
                          {calendrierModule.anneeInscription.annee}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${calendrierModule.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${calendrierModule.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="pfumv10App.calendrierModule.home.notFound">No Calendrier Modules found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ calendrierModule }: IRootState) => ({
  calendrierModuleList: calendrierModule.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendrierModule);
