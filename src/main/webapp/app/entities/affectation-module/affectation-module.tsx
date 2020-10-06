import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, getEntitiesBySemestre } from './affectation-module.reducer';
import { IAffectationModule } from 'app/shared/model/affectation-module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAffectationModuleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAffectationModuleState {
  search: string;
}

export class AffectationModule extends React.Component<IAffectationModuleProps, IAffectationModuleState> {
  state: IAffectationModuleState = {
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

  filtrerListAffectationModule = e => {
    this.props.history.push('/entity/affectation-module');

    if (e.target.value === '') this.props.getEntities();
    else this.props.getEntitiesBySemestre(e.target.value);
  };

  render() {
    const { affectationModuleList, match } = this.props;
    return (
      <div>
        <h2 id="affectation-module-heading">
          Liste des affectations modules
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Créer une nouvelle affectation
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            Choisissez un semestre
            <select onChange={this.filtrerListAffectationModule}>
              <option value=""> </option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
              <option value="S4">S4</option>
              <option value="S5">S5</option>
              <option value="S6">S6</option>
            </select>
          </Col>
        </Row>
        <div className="table-responsive">
          {affectationModuleList && affectationModuleList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.affectationModule.annee">Annee</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.affectationModule.semestre">Semestre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.affectationModule.module">Module</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.affectationModule.professeur">Professeur</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {affectationModuleList.map((affectationModule, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{affectationModule.annee}</td>
                    <td>
                      <Translate contentKey={`pfumv10App.Semestre.${affectationModule.semestre}`} />
                    </td>
                    <td>
                      {affectationModule.module ? (
                        <Link to={`module/${affectationModule.module.id}`}>{affectationModule.module.nomModule}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {affectationModule.professeur ? (
                        <Link to={`professeur/${affectationModule.professeur.id}`}>{affectationModule.professeur.nom}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${affectationModule.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${affectationModule.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.affectationModule.home.notFound">No Affectation Modules found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ affectationModule }: IRootState) => ({
  affectationModuleList: affectationModule.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  getEntitiesBySemestre
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AffectationModule);
