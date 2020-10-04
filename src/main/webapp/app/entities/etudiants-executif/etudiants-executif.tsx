import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, updateEntity } from './etudiants-executif.reducer';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

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

  render() {
    const { etudiantsExecutifList, match } = this.props;
    return (
      <div>
        <h2 id="etudiants-executif-heading">
          <Translate contentKey="pfumv10App.etudiantsExecutif.home.title">Etudiants Executifs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.etudiantsExecutif.home.createLabel">Create new Etudiants Executif</Translate>
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

                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.inscriptionvalide">Inscriptionvalide</Translate>
                  </th>

                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.filiere">Filiere</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.anneeInscription">Annee Inscription</Translate>
                  </th>

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

const mapStateToProps = ({ etudiantsExecutif }: IRootState) => ({
  etudiantsExecutifList: etudiantsExecutif.entities
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
)(EtudiantsExecutif);
