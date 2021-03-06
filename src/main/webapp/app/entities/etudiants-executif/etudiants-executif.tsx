import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, updateEntity, getEntitiesByFiliere } from './etudiants-executif.reducer';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { getEntitie as getEtablissements } from 'app/entities/etablissement/etablissement.reducer';
import { getEntitie as getFilieres, getEntitiesByEtab } from 'app/entities/filiere/filiere.reducer';

export interface IEtudiantsExecutifProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEtudiantsExecutifState {
  search: string;
}

export class EtudiantsExecutif extends React.Component<IEtudiantsExecutifProps, IEtudiantsExecutifState> {
  state: IEtudiantsExecutifState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
    this.props.getEtablissements();
    this.props.getFilieres();
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
  toggleActive = etudiantsExecutif => () => {
    this.props.updateEntity({
      ...etudiantsExecutif,
      inscriptionvalide: !etudiantsExecutif.inscriptionvalide
    });
  };
  //===========CHT====================================

  filtrerListFiliereEtab = e => {
    this.props.getEntitiesByEtab(e.target.value);
  };

  filtrerListEtudiantByFiliere = e => {
    this.props.history.push('/entity/etudiants-executif');
    if (e.target.value === '') this.props.getEntities();
    else this.props.getEntitiesByFiliere(e.target.value);
  };

  render() {
    const { etudiantsExecutifList, match, etablissements, filieres } = this.props;
    return (
      <div>
        <h2 id="etudiants-executif-heading">
          Liste des étudiants Master executif
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Ajouter étudiant
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                  <strong className="mr-auto">Etat d'inscription</strong>
                </div>
                <div className="toast-body">
                  <AvGroup>
                    <Label for="filiere-etablissement">
                      <Translate contentKey="pfumv10App.filiere.etablissement">Etablissement</Translate>
                    </Label>
                    <AvInput
                      id="filiere-etablissement"
                      type="select"
                      className="form-control"
                      name="etablissement.id"
                      onChange={this.filtrerListFiliereEtab}
                    >
                      <option value="" key="0" />
                      {etablissements
                        ? etablissements.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.nomEcole}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="module-filiere">Filière</Label>
                    <AvInput
                      id="module-filiere"
                      type="select"
                      className="form-control"
                      name="filiere.id"
                      onChange={this.filtrerListEtudiantByFiliere}
                    >
                      <option value="" key="0" />
                      {filieres
                        ? filieres.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.nomfiliere}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                </div>
              </div>
              <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                  <strong className="mr-auto">Recherche</strong>
                  <div className="toast-body">
                    <AvGroup>
                      <InputGroup>
                        <AvInput
                          type="text"
                          name="search"
                          value={this.state.search}
                          onChange={this.handleSearch}
                          placeholder={translate('pfumv10App.etudiantsExecutif.home.search')}
                        />
                        <Button className="input-group-addon">
                          <FontAwesomeIcon icon="search" />
                        </Button>
                        <Button type="reset" className="input-group-addon" onClick={this.clear}>
                          <FontAwesomeIcon icon="trash" />
                        </Button>
                      </InputGroup>
                    </AvGroup>
                  </div>
                </div>
              </div>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          {etudiantsExecutifList && etudiantsExecutifList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>N° etudiant</th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.nom">Nom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.prenom">Prenom</Translate>
                  </th>

                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.photo">Photo</Translate>
                  </th>

                  <th>Validité</th>

                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.filiere">Filiere</Translate>
                  </th>
                  <th>Année scolaire</th>

                  <th />
                </tr>
              </thead>
              <tbody>
                {etudiantsExecutifList.map((etudiantsExecutif, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{etudiantsExecutif.suffixe}</td>
                    <td>{etudiantsExecutif.nom}</td>
                    <td>{etudiantsExecutif.prenom}</td>
                    <td>
                      {etudiantsExecutif.photo ? (
                        <div>
                          <a onClick={openFile(etudiantsExecutif.photoContentType, etudiantsExecutif.photo)}>
                            <img
                              src={`data:${etudiantsExecutif.photoContentType};base64,${etudiantsExecutif.photo}`}
                              style={{ maxHeight: '70px' }}
                            />
                            &nbsp;
                          </a>
                        </div>
                      ) : null}
                    </td>

                    <td>
                      {etudiantsExecutif.inscriptionvalide ? (
                        <Button color="success" onClick={this.toggleActive(etudiantsExecutif)}>
                          Validé
                        </Button>
                      ) : (
                        <Button color="danger" onClick={this.toggleActive(etudiantsExecutif)}>
                          En attente
                        </Button>
                      )}
                    </td>

                    <td>
                      {etudiantsExecutif.filiere ? (
                        <Link to={`filiere/${etudiantsExecutif.filiere.id}`}>{etudiantsExecutif.filiere.nomfiliere}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {etudiantsExecutif.anneeInscription ? (
                        <Link to={`annee-inscription/${etudiantsExecutif.anneeInscription.id}`}>
                          {etudiantsExecutif.anneeInscription.annee}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>

                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${etudiantsExecutif.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etudiantsExecutif.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etudiantsExecutif.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.etudiantsExecutif.home.notFound">No Etudiants Executifs found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  etudiantsExecutifList: storeState.etudiantsExecutif.entities,
  etablissements: storeState.etablissement.entities,
  filieres: storeState.filiere.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  updateEntity,
  getEtablissements,
  getFilieres,
  getEntitiesByEtab,
  getEntitiesByFiliere
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantsExecutif);
