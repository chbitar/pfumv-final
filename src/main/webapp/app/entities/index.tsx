import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Absence from './absence';
import AffectationModule from './affectation-module';
import AnneeInscription from './annee-inscription';
import CalendrierModule from './calendrier-module';
import EtudiantsExecutif from './etudiants-executif';
import EtudiantsLicence from './etudiants-licence';
import EtudiantsMaster from './etudiants-master';
import Filiere from './filiere';
import Module from './module';
import Professeur from './professeur';
import SuiviModule from './suivi-module';
import Etablissement from './etablissement';
import ModalitePaiement from './modalite-paiement';
import EspaceEtudiant from './espace-etudiant';
import Annonce from './annonce';
import NoteLicence from './note-licence';
import NoteMaster from './note-master';
import NoteExecutif from './note-executif';
import TableauDeBoard from './tableau-de-board';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/absence`} component={Absence} />
      <ErrorBoundaryRoute path={`${match.url}/affectation-module`} component={AffectationModule} />
      <ErrorBoundaryRoute path={`${match.url}/annee-inscription`} component={AnneeInscription} />
      <ErrorBoundaryRoute path={`${match.url}/calendrier-module`} component={CalendrierModule} />
      <ErrorBoundaryRoute path={`${match.url}/etudiants-executif`} component={EtudiantsExecutif} />
      <ErrorBoundaryRoute path={`${match.url}/etudiants-licence`} component={EtudiantsLicence} />
      <ErrorBoundaryRoute path={`${match.url}/etudiants-master`} component={EtudiantsMaster} />
      <ErrorBoundaryRoute path={`${match.url}/filiere`} component={Filiere} />
      <ErrorBoundaryRoute path={`${match.url}/module`} component={Module} />
      <ErrorBoundaryRoute path={`${match.url}/professeur`} component={Professeur} />
      <ErrorBoundaryRoute path={`${match.url}/suivi-module`} component={SuiviModule} />
      <ErrorBoundaryRoute path={`${match.url}/etablissement`} component={Etablissement} />
      <ErrorBoundaryRoute path={`${match.url}/modalite-paiement`} component={ModalitePaiement} />
      <ErrorBoundaryRoute path={`${match.url}/espace-etudiant`} component={EspaceEtudiant} />
      <ErrorBoundaryRoute path={`${match.url}/annonce`} component={Annonce} />
      <ErrorBoundaryRoute path={`${match.url}/note-licence`} component={NoteLicence} />
      <ErrorBoundaryRoute path={`${match.url}/note-master`} component={NoteMaster} />
      <ErrorBoundaryRoute path={`${match.url}/note-executif`} component={NoteExecutif} />
      <ErrorBoundaryRoute path={`${match.url}/tableau-de-board`} component={TableauDeBoard} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
