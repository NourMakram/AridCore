
import { NgModule } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { UserPagesComponent } from './user-pages.component';
import { PagesComponent } from '../Components/pages/pages.component';
import { DeshboardComponent } from './deshboard/deshboard.component';
import { InviteFriendComponent } from '../Components/invite-friend/invite-friend.component';
import { AcademicDegreesComponent } from './AcademicDegree/academic-degrees/academic-degrees.component';
import { AddAcademicDegreeComponent } from './AcademicDegree/add-academic-degree/add-academic-degree.component';
import { EditAcademicDegreeComponent } from './AcademicDegree/edit-academic-degree/edit-academic-degree.component';
import { AddBadgeComponent } from './Badges/add-badge/add-badge.component';
import { BadgesComponent } from './Badges/badges/badges.component';
import { EditBadgeComponent } from './Badges/edit-badge/edit-badge.component';
import { AddCertificateTemplateComponent } from './CertificateTemplates/add-certificate-template/add-certificate-template.component';
import { AddEnCertificateTemplatesComponent } from './CertificateTemplates/add-en-certificate-templates/add-en-certificate-templates.component';
import { CertificateTemplatesComponent } from './CertificateTemplates/certificate-templates/certificate-templates.component';
import { EditCertificateTemplateComponent } from './CertificateTemplates/edit-certificate-template/edit-certificate-template.component';
import { AddCityComponent } from './Cities/add-city/add-city.component';
import { CitiesComponent } from './Cities/cities/cities.component';
import { EditCityComponent } from './Cities/edit-city/edit-city.component';
import { AddComponent } from './Countries/add/add.component';
import { CountriesComponent } from './Countries/countries/countries.component';
import { EditComponent } from './Countries/edit/edit.component';
import { AddEmailContentComponent } from './EmailContents/add-email-content/add-email-content.component';
import { EditEmailContentComponent } from './EmailContents/edit-email-content/edit-email-content.component';
import { EmailContentsComponent } from './EmailContents/email-contents/email-contents.component';
import { AddEmailSendingLogComponent } from './EmailSendingLogs/add-email-sending-log/add-email-sending-log.component';
import { EditEmailSendingLogComponent } from './EmailSendingLogs/edit-email-sending-log/edit-email-sending-log.component';
import { EmailSendingLogsComponent } from './EmailSendingLogs/email-sending-logs/email-sending-logs.component';
import { AddFacultyComponent } from './Faculties/add-faculty/add-faculty.component';
import { EditFacultyComponent } from './Faculties/edit-faculty/edit-faculty.component';
import { FacultiesComponent } from './Faculties/faculties/faculties.component';
import { AddPositionTypesComponent } from './PositionTypes/add-position-types/add-position-types.component';
import { EditPositionTypesComponent } from './PositionTypes/edit-position-types/edit-position-types.component';
import { PositionTypesComponent } from './PositionTypes/position-types/position-types.component';
import { AddRoleComponent } from './Roles/add-role/add-role.component';
import { EditRoleComponent } from './Roles/edit-role/edit-role.component';
import { RolesComponent } from './Roles/roles/roles.component';
import { AddSkillComponent } from './Skills/add-skill/add-skill.component';
import { EditSkillComponent } from './Skills/edit-skill/edit-skill.component';
import { SkillsComponent } from './Skills/skills/skills.component';
import { AddSpecialityComponent } from './Specialities/add-speciality/add-speciality.component';
import { EditSpecialityComponent } from './Specialities/edit-speciality/edit-speciality.component';
import { SpecialitiesComponent } from './Specialities/specialities/specialities.component';
import { AddUniversityComponent } from './Universities/add-university/add-university.component';
import { EditUniversityComponent } from './Universities/edit-university/edit-university.component';
import { UniversitiesComponent } from './Universities/universities/universities.component';
import { AddUserBadgeComponent } from './UserBadges/add-user-badge/add-user-badge.component';
import { EditUserBadgeComponent } from './UserBadges/edit-user-badge/edit-user-badge.component';
import { UserBadgesComponent } from './UserBadges/user-badges/user-badges.component';
import { AddUserComponent } from './UserManagment/add-user/add-user.component';
import { EditUserComponent } from './UserManagment/edit-user/edit-user.component';
import { UsersComponent } from './UserManagment/users/users.component';
import { AddCreditSystemComponent } from './CreditSystem/admin-credit-system/add-credit-system/add-credit-system.component';
import { EditCreditSystemComponent } from './CreditSystem/admin-credit-system/edit-credit-system/edit-credit-system.component';
import { ShowCreditSystemComponent } from './CreditSystem/admin-credit-system/show-credit-system/show-credit-system.component';
import { AdminAddDonateComponent } from './Donate/admin-add-donate/admin-add-donate.component';
import { DonatesComponent } from './Donate/donates/donates.component';
import { EditDonateComponent } from './Donate/edit-donate/edit-donate.component';
import { AddExpertiseComponent } from './Expertises/add-expertise/add-expertise.component';
import { EditExpertiseComponent } from './Expertises/edit-expertise/edit-expertise.component';
import { ExpertisesComponent } from './Expertises/expertises/expertises.component';
import { AddmemberShipComponent } from './MemberShip/addmember-ship/addmember-ship.component';
import { EditmemberShipComponent } from './MemberShip/editmember-ship/editmember-ship.component';
import { MembersComponent } from './MemberShip/members/members.component';
import { AddPartnerComponent } from './Partners/add-partner/add-partner.component';
import { EditPartnerComponent } from './Partners/edit-partner/edit-partner.component';
import { PartnersComponent } from './Partners/partners/partners.component';
import { AddSendersComponent } from './Senders/add-senders/add-senders.component';
import { EditSendersComponent } from './Senders/edit-senders/edit-senders.component';
import { SendersComponent } from './Senders/senders/senders.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CrowdFundingManagmentComponent } from '../Components/CrowdFunding/crowd-funding-managment/crowd-funding-managment.component';
import { AddCrowdFundingComponent } from '../Components/CrowdFunding/add-crowd-funding/add-crowd-funding.component';
import { DetailsCrowdFundingComponent } from '../Components/CrowdFunding/details-crowd-funding/details-crowd-funding.component';
import { EditCrowdFundingComponent } from '../Components/CrowdFunding/edit-crowd-funding/edit-crowd-funding.component';
import { PaymentCrowdFundongListComponent } from '../Components/CrowdFunding/payment-crowd-fundong-list/payment-crowd-fundong-list.component';
import { CrowdFundingContributionTypesComponent } from '../Components/CrowdFundingContributionTypes/crowd-funding-contribution-types/crowd-funding-contribution-types.component';
import { CrowdFundingMilestonesComponent } from '../Components/CrowdFundingMilestones/crowd-funding-milestones/crowd-funding-milestones.component';
import { CrowdFundingUpdatesComponent } from '../Components/CrowdFundingUpdates/crowd-funding-updates/crowd-funding-updates.component';
import { CrowdFundingUsersComponent } from '../Components/CrowdFundingUsers/crowd-funding-users/crowd-funding-users.component';
import { AllStatementsComponent } from './Statements/all-statements/all-statements.component';
import { ArchivedComponent } from '../Components/Messages/archived/archived.component';
import { InboxMessageComponent } from '../Components/Messages/inbox-message/inbox-message.component';
import { MessageDetailsComponent } from '../Components/Messages/message-details/message-details.component';
import { MessagesComponent } from '../Components/Messages/messages/messages.component';
import { SentMessageComponent } from '../Components/Messages/sent-message/sent-message.component';
import { CalendarEventCategoriesComponent } from './CalendarEvent/CalendarEventCategorie/calendar-event-categories/calendar-event-categories.component';
import { CalendarEventsComponent } from './CalendarEvent/CalendarEvent/calendar-events/calendar-events.component';
import { AdminAddressComponent } from '../Components/Address/admin-address/admin-address.component';
import { AddAddressComponent } from '../Components/Address/add-address/add-address.component';
import { EditAddressComponent } from '../Components/Address/edit-address/edit-address.component';
import { LayoutAdsComponent } from './LayoutAds/layout-ads/layout-ads.component';
import { AridCertificatesComponent } from './AridCertificate/arid-certificates/arid-certificates.component';

const routes: Routes =
  [
    {
      path: '', component: UserPagesComponent,
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'ControlPanel' },

        { path: "ControlPanel", component: DeshboardComponent },
        { path: 'countries', component: CountriesComponent },
        { path: "countries/Add", component: AddComponent },
        { path: "countries/Edit/:id", component: EditComponent },

        { path: 'cities', component: CitiesComponent },
        { path: "cities/Add", component: AddCityComponent },
        { path: "cities/Edit/:id", component: EditCityComponent },


        { path: 'Roles', component: RolesComponent },
        { path: "Roles/Add", component: AddRoleComponent },
        { path: "Roles/Edit/:id", component: EditRoleComponent },

        { path: 'specialities', component: SpecialitiesComponent },
        { path: "specialities/Add", component: AddSpecialityComponent },
        { path: "specialities/Edit/:id", component: EditSpecialityComponent },

        { path: 'universities', component: UniversitiesComponent },
        { path: "universities/Add", component: AddUniversityComponent },
        { path: "universities/Edit/:id", component: EditUniversityComponent },

        { path: 'faculties', component: FacultiesComponent },
        { path: "faculties/Add", component: AddFacultyComponent },
        { path: "faculties/Edit/:id", component: EditFacultyComponent },

        { path: "users", component: UsersComponent },
        { path: "users/Add", component: AddUserComponent },
        { path: "users/Edit/:id", component: EditUserComponent },

        { path: "AcademicDegrees", component: AcademicDegreesComponent },
        { path: "AcademicDegrees/Add", component: AddAcademicDegreeComponent },
        { path: "AcademicDegrees/Edit/:id", component: EditAcademicDegreeComponent },


        { path: "PositionTypes", component: PositionTypesComponent },
        { path: "PositionTypes/Add", component: AddPositionTypesComponent },
        { path: "PositionTypes/Edit/:id", component: EditPositionTypesComponent },

        { path: "Skills", component: SkillsComponent },
        { path: "Skills/Add", component: AddSkillComponent },
        { path: "Skills/Edit/:id", component: EditSkillComponent },


        { path: "Expertises", component: ExpertisesComponent },
        { path: "Expertises/Add", component: AddExpertiseComponent },
        { path: "Expertises/Edit/:id", component: EditExpertiseComponent },

        { path: "MemberShips/Add", component: AddmemberShipComponent },
        { path: "MemberShips/Edit/:id", component: EditmemberShipComponent },
        { path: "MemberShips", component: MembersComponent },

        { path: "CertificateTemplates/ArAdd", component: AddCertificateTemplateComponent },
        { path: "CertificateTemplates/EnAdd", component: AddEnCertificateTemplatesComponent },
        { path: "CertificateTemplates/Edit/:id", component: EditCertificateTemplateComponent },
        { path: "CertificateTemplates", component: CertificateTemplatesComponent },

        { path: "Senders/Add", component: AddSendersComponent },
        { path: "Senders/Edit/:id", component: EditSendersComponent },
        { path: "Senders", component: SendersComponent },

        { path: "EmailContents/Add", component: AddEmailContentComponent },
        { path: "EmailContents/Edit/:id", component: EditEmailContentComponent },
        { path: "EmailContents", component: EmailContentsComponent },

        { path: "Badges/Add", component: AddBadgeComponent },
        { path: "Badges/Edit/:id", component: EditBadgeComponent },
        { path: "Badges", component: BadgesComponent },


        { path: "EmailSendingLogs/Add", component: AddEmailSendingLogComponent },
        { path: "EmailSendingLogs/Edit/:id", component: EditEmailSendingLogComponent },
        { path: "EmailSendingLogs", component: EmailSendingLogsComponent },


        { path: "UserBadges/Add", component: AddUserBadgeComponent },
        { path: "UserBadges/Edit/:id", component: EditUserBadgeComponent },
        { path: "UserBadges", component: UserBadgesComponent },

        { path: "CreditSystem/Add", component: AddCreditSystemComponent },
        { path: "CreditSystem/Edit/:id", component: EditCreditSystemComponent },
        { path: "CreditSystem", component: ShowCreditSystemComponent },

        { path: "Donate", component: DonatesComponent },
        { path: "Donate/Add", component: AdminAddDonateComponent },
        { path: "Donate/Edit/:id", component: EditDonateComponent },

        { path: "InviteFriend", component: InviteFriendComponent },

        { path: "Partner", component: PartnersComponent },
        { path: "Partner/Add", component: AddPartnerComponent },
        { path: "Partner/Edit/:id", component: EditPartnerComponent },

        { path: "CrowdFunding", component: CrowdFundingManagmentComponent },
        { path: "CrowdFunding/Add", component: AddCrowdFundingComponent },
        { path: "CrowdFunding/Details/:id", component: DetailsCrowdFundingComponent },
        { path: "CrowdFunding/ُEdit/:id", component: EditCrowdFundingComponent },
        { path: "CrowdFunding/Payments/:id", component: PaymentCrowdFundongListComponent },
        { path: "CrowdFunding/ContributionTypes/:id", component: CrowdFundingContributionTypesComponent },
        { path: "CrowdFunding/Milestones/:id", component: CrowdFundingMilestonesComponent },
        { path: "CrowdFunding/Updates/:id", component: CrowdFundingUpdatesComponent },
        { path: "CrowdFunding/Users/:id", component: CrowdFundingUsersComponent },
        { path: "Statements", component: AllStatementsComponent },
        { path: "CalendarEventCategorie", component: CalendarEventCategoriesComponent },
        { path: "CalendarEvent", component: CalendarEventsComponent },

        { path: "LayoutAds", component: LayoutAdsComponent },

        {
          path: 'Messages', component: MessagesComponent, children:
            [
              { path: '', redirectTo: 'InboxMessages', pathMatch: "full" },
              { path: "SentMessages", component: SentMessageComponent },
              { path: "InboxMessages", component: InboxMessageComponent },
              { path: "Archive", component: ArchivedComponent },
              { path: "Details/:id", component: MessageDetailsComponent }

            ]
        },
        { path: "Addresses", component: AdminAddressComponent },
        { path: "Addresses/Add", component: AddAddressComponent },
        { path: "Addresses/Edit/:id", component: EditAddressComponent },
        { path: "Certificates/:id", component: AridCertificatesComponent },


      ]
    },
    { path: '', pathMatch: 'full', redirectTo: 'userPage/ControlPanel' }
  ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]

})
export class UserPagesRoutingModule { }
