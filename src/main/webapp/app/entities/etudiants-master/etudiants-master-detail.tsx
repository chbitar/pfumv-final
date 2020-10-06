import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './etudiants-master.reducer';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtudiantsMasterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtudiantsMasterDetail extends React.Component<IEtudiantsMasterDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { etudiantsMasterEntity } = this.props;
    return (
      <div>
        <Row>
          <div>
            <Row>
              <Col md="6">
                <span className="badge badge-warning">Informations personnelles</span>
                <h2>
                  N° Etudiant : [<b>{etudiantsMasterEntity.suffixe}</b>]
                </h2>
                <dl className="jh-entity-details">
                  <dt>
                    <span id="nom">
                      <Translate contentKey="pfumv10App.etudiantsMaster.nom">Nom</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.nom}</dd>
                  <dt>
                    <span id="prenom">
                      <Translate contentKey="pfumv10App.etudiantsMaster.prenom">Prenom</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.prenom}</dd>
                  <dt>
                    <span id="dateNaissance">
                      <Translate contentKey="pfumv10App.etudiantsMaster.dateNaissance">Date Naissance</Translate>
                    </span>
                  </dt>
                  <dd>
                    <TextFormat value={etudiantsMasterEntity.dateNaissance} type="date" format={APP_DATE_FORMAT} />
                  </dd>
                  <dt>
                    <span id="adresseContact">
                      <Translate contentKey="pfumv10App.etudiantsMaster.adresseContact">Adresse Contact</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.adresseContact}</dd>
                  <dt>
                    <span id="ville">
                      <Translate contentKey="pfumv10App.etudiantsMaster.ville">Ville</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.ville}</dd>
                  <dt>
                    <span id="email">
                      <Translate contentKey="pfumv10App.etudiantsMaster.email">Email</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.email}</dd>
                  <dt>
                    <span id="cinPass">
                      <Translate contentKey="pfumv10App.etudiantsMaster.cinPass">Cin Pass</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.cinPass}</dd>
                  <dt>
                    <span id="codepostal">
                      <Translate contentKey="pfumv10App.etudiantsMaster.codepostal">Codepostal</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.codepostal}</dd>
                  <dt>
                    <span id="paysNationalite">
                      <Translate contentKey="pfumv10App.etudiantsMaster.paysNationalite">Pays Nationalite</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.paysNationalite}</dd>
                </dl>
              </Col>
              <Col md="6">
                <span className="badge badge-warning">Informations filiére</span>
                <dt>
                  <span id="photo">
                    <Translate contentKey="pfumv10App.etudiantsMaster.photo">Photo</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.photo ? (
                    <div>
                      <a onClick={openFile(etudiantsMasterEntity.photoContentType, etudiantsMasterEntity.photo)}>
                        <img
                          src={`data:${etudiantsMasterEntity.photoContentType};base64,${etudiantsMasterEntity.photo}`}
                          style={{ maxHeight: '200px' }}
                        />
                      </a>
                    </div>
                  ) : null}
                </dd>
                <dt>
                  <Translate contentKey="pfumv10App.etudiantsMaster.anneeInscription">Annee Inscription</Translate>
                </dt>
                <dd>{etudiantsMasterEntity.anneeInscription ? etudiantsMasterEntity.anneeInscription.annee : ''}</dd>
                <dt>
                  <span id="typeBac">
                    <span id="pjBac">Intitulé d'un bac :</span>
                  </span>
                </dt>
                <dd>{etudiantsMasterEntity.typeBac}</dd>
                <dt>
                  <span id="mention">
                    <Translate contentKey="pfumv10App.etudiantsMaster.mention">Mention</Translate>
                  </span>
                </dt>
                <dd>{etudiantsMasterEntity.mention}</dd>
                <dt>
                  <Translate contentKey="pfumv10App.etudiantsMaster.filiere">Filiere</Translate>
                </dt>
                <dd>{etudiantsMasterEntity.filiere ? etudiantsMasterEntity.filiere.nomfiliere : ''}</dd>
                <dt>
                  <span id="paysResidence">
                    <Translate contentKey="pfumv10App.etudiantsMaster.paysResidence">Pays Residence</Translate>
                  </span>
                </dt>
                <dd>{etudiantsMasterEntity.paysResidence}</dd>

                <dt>
                  <span id="province">
                    <Translate contentKey="pfumv10App.etudiantsMaster.province">Province</Translate>
                  </span>
                </dt>
                <dd>{etudiantsMasterEntity.province}</dd>
                <dt>
                  <span id="tel">
                    <Translate contentKey="pfumv10App.etudiantsMaster.tel">Tel</Translate>
                  </span>
                </dt>
                <dd>{etudiantsMasterEntity.tel}</dd>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <span className="badge badge-warning">Piéces jointes</span>
                <dt>
                  <span id="extraitActeNaissance">
                    <Translate contentKey="pfumv10App.etudiantsMaster.extraitActeNaissance">Extrait Acte Naissance</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.extraitActeNaissance ? (
                    <div>
                      <a
                        onClick={openFile(
                          etudiantsMasterEntity.extraitActeNaissanceContentType,
                          etudiantsMasterEntity.extraitActeNaissance
                        )}
                      >
                        <img
                          src={`data:${etudiantsMasterEntity.extraitActeNaissanceContentType};base64,${
                            etudiantsMasterEntity.extraitActeNaissance
                          }`}
                          style={{ maxHeight: '30px' }}
                        />
                      </a>
                      <span>
                        {etudiantsMasterEntity.extraitActeNaissanceContentType}, {byteSize(etudiantsMasterEntity.extraitActeNaissance)}
                      </span>
                    </div>
                  ) : null}
                </dd>
                <dt>
                  <span id="bacalaureat">
                    <Translate contentKey="pfumv10App.etudiantsMaster.bacalaureat">Bacalaureat</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.bacalaureat ? (
                    <div>
                      <a onClick={openFile(etudiantsMasterEntity.bacalaureatContentType, etudiantsMasterEntity.bacalaureat)}>
                        <img
                          src={`data:${etudiantsMasterEntity.bacalaureatContentType};base64,${etudiantsMasterEntity.bacalaureat}`}
                          style={{ maxHeight: '30px' }}
                        />
                      </a>
                      <span>
                        {etudiantsMasterEntity.bacalaureatContentType}, {byteSize(etudiantsMasterEntity.bacalaureat)}
                      </span>
                    </div>
                  ) : null}
                </dd>
                <dt>
                  <span id="cinPassport">
                    <Translate contentKey="pfumv10App.etudiantsMaster.cinPassport">Cin Passport</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.cinPassport ? (
                    <div>
                      <a onClick={openFile(etudiantsMasterEntity.cinPassportContentType, etudiantsMasterEntity.cinPassport)}>
                        <img
                          src={`data:${etudiantsMasterEntity.cinPassportContentType};base64,${etudiantsMasterEntity.cinPassport}`}
                          style={{ maxHeight: '30px' }}
                        />
                      </a>
                      <span>
                        {etudiantsMasterEntity.cinPassportContentType}, {byteSize(etudiantsMasterEntity.cinPassport)}
                      </span>
                    </div>
                  ) : null}
                </dd>
                <dt>
                  <span id="diplome">
                    <Translate contentKey="pfumv10App.etudiantsMaster.diplome">Diplome</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.diplome ? (
                    <div>
                      <a onClick={openFile(etudiantsMasterEntity.diplomeContentType, etudiantsMasterEntity.diplome)}>
                        <img
                          src={`data:${etudiantsMasterEntity.diplomeContentType};base64,${etudiantsMasterEntity.diplome}`}
                          style={{ maxHeight: '30px' }}
                        />
                      </a>
                      <span>
                        {etudiantsMasterEntity.diplomeContentType}, {byteSize(etudiantsMasterEntity.diplome)}
                      </span>
                    </div>
                  ) : null}
                </dd>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <span className="badge badge-warning">Status d'inscription</span>
                <dt>
                  <span id="inscriptionvalide">
                    <Translate contentKey="pfumv10App.etudiantsMaster.inscriptionvalide">Inscriptionvalide</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.inscriptionvalide ? (
                    <Button color="success">Validé</Button>
                  ) : (
                    <Button color="danger">En attente</Button>
                  )}
                </dd>
                <dt>
                  <Translate contentKey="pfumv10App.etudiantsMaster.modalite">Modalite</Translate>
                </dt>
                <dd>{etudiantsMasterEntity.modalite ? etudiantsMasterEntity.modalite.modalite : ''}</dd>
                <dd>
                  <Button color="info">Attestation d'inscription</Button>
                </dd>
                <dd>
                  <Button color="info">Badge</Button>
                </dd>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <Button tag={Link} to="/entity/etudiants-master" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/entity/etudiants-master/${etudiantsMasterEntity.id}/edit`} replace color="primary">
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.edit">Edit</Translate>
                  </span>
                </Button>
              </Col>
            </Row>
          </div>

          <Col md="8" />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ etudiantsMaster }: IRootState) => ({
  etudiantsMasterEntity: etudiantsMaster.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantsMasterDetail);
