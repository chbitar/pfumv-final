import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, updateEntity } from './etudiants-master.reducer';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtudiantsMasterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEtudiantsMasterState {
  search: string;
}

export class EtudiantsMaster extends React.Component<IEtudiantsMasterProps, IEtudiantsMasterState> {
  state: IEtudiantsMasterState = {
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

  //===========CHT====================================
  toggleActive = etudiantsMaster => () => {
    this.props.updateEntity({
      ...etudiantsMaster,
      inscriptionvalide: !etudiantsMaster.inscriptionvalide
    });
  };
  //===========CHT====================================

  render() {
    const { etudiantsMasterList, match } = this.props;
    return (
      <div>
        <h2 id="etudiants-master-heading">
          <Translate contentKey="pfumv10App.etudiantsMaster.home.title">Etudiants Masters</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.etudiantsMaster.home.createLabel">Create new Etudiants Master</Translate>
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
                    placeholder={translate('pfumv10App.etudiantsMaster.home.search')}
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
          {etudiantsMasterList && etudiantsMasterList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>N° étudiant</th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.nom">Nom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.prenom">Prenom</Translate>
                  </th>

                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.photo">Photo</Translate>
                  </th>

                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.inscriptionvalide">Inscriptionvalide</Translate>
                  </th>

                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.filiere">Filiere</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.anneeInscription">Annee Inscription</Translate>
                  </th>

                  <th />
                </tr>
              </thead>
              <tbody>
                {etudiantsMasterList.map((etudiantsMaster, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{etudiantsMaster.suffixe}</td>
                    <td>{etudiantsMaster.nom}</td>
                    <td>{etudiantsMaster.prenom}</td>

                    <td>
                      {etudiantsMaster.photo ? (
                        <div>
                          <a onClick={openFile(etudiantsMaster.photoContentType, etudiantsMaster.photo)}>
                            <img
                              src={`data:${etudiantsMaster.photoContentType};base64,${etudiantsMaster.photo}`}
                              style={{ maxHeight: '70px' }}
                            />
                            &nbsp;
                          </a>
                        </div>
                      ) : null}
                    </td>

                    <td>
                      {etudiantsMaster.inscriptionvalide ? (
                        <Button color="success" onClick={this.toggleActive(etudiantsMaster)}>
                          Validé
                        </Button>
                      ) : (
                        <Button color="danger" onClick={this.toggleActive(etudiantsMaster)}>
                          En attente
                        </Button>
                      )}
                    </td>

                    <td>
                      {etudiantsMaster.filiere ? (
                        <Link to={`filiere/${etudiantsMaster.filiere.id}`}>{etudiantsMaster.filiere.nomfiliere}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {etudiantsMaster.anneeInscription ? (
                        <Link to={`annee-inscription/${etudiantsMaster.anneeInscription.id}`}>
                          {etudiantsMaster.anneeInscription.annee}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>

                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${etudiantsMaster.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etudiantsMaster.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etudiantsMaster.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.etudiantsMaster.home.notFound">No Etudiants Masters found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ etudiantsMaster }: IRootState) => ({
  etudiantsMasterList: etudiantsMaster.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  updateEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantsMaster);
