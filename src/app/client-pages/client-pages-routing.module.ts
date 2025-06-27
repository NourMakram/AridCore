import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPagesComponent } from './client-pages.component';
 import { PagesComponent } from '../Components/pages/pages.component';
import { ChangePasswordComponent } from '../Components/UserInfo/change-password/change-password.component';
import { UserContactComponent } from '../Components/UserInfo/user-contact/user-contact.component';
import { UserCvComponent } from '../Components/UserInfo/user-cv/user-cv.component';
import { UserInfoComponent } from '../Components/UserInfo/user-info/user-info.component';
import { UserSummeryComponent } from '../Components/UserInfo/user-summery/user-summery.component';
 import { MemberShipComponent } from '../user-pages/MemberShip/member-ship/member-ship.component';
import { ShowBadgesComponent } from '../user-pages/Badges/show-badges/show-badges.component';
import { DetailsComponent } from '../user-pages/Badges/details/details.component';
import { InviteFriendComponent } from '../Components/invite-friend/invite-friend.component';
  import { UserAddCreditSystemComponent } from '../user-pages/CreditSystem/user-credit-system/user-add-credit-system/user-add-credit-system.component';
import { UserEditCreditSystemComponent } from '../user-pages/CreditSystem/user-credit-system/user-edit-credit-system/user-edit-credit-system.component';
import { UserShowCreditSystemComponent } from '../user-pages/CreditSystem/user-credit-system/user-show-credit-system/user-show-credit-system.component';
import { AddDonateComponent } from '../user-pages/Donate/add-donate/add-donate.component';
import { DonateComponent } from '../user-pages/Donate/donate/donate.component';
import { AddPartnerComponent } from '../user-pages/Partners/add-partner/add-partner.component';
import { ListPartnersComponent } from '../user-pages/Partners/list-partners/list-partners.component';
import { AcademicPositionComponent } from './AcademicPosition/academic-position/academic-position.component';
import { AddAcademicPositionComponent } from './AcademicPosition/add-academic-position/add-academic-position.component';
import { EditAcademicPositionComponent } from './AcademicPosition/edit-academic-position/edit-academic-position.component';
import { AddEducationalLevelComponent } from './EducationalLevel/add-educational-level/add-educational-level.component';
import { EditEducationalLevelComponent } from './EducationalLevel/edit-educational-level/edit-educational-level.component';
import { EducationalLevelsComponent } from './EducationalLevel/educational-levels/educational-levels.component';
import { AddProfileLinksComponent } from './ProfileLink/add-profile-links/add-profile-links.component';
import { EditProfileLinksComponent } from './ProfileLink/edit-profile-links/edit-profile-links.component';
import { ProfileLinksComponent } from './ProfileLink/profile-links/profile-links.component';
import { AddprojectComponent } from './Project/addproject/addproject.component';
import { EditprojectComponent } from './Project/editproject/editproject.component';
import { ProjectsComponent } from './Project/projects/projects.component';
import { AddPublicationComponent } from './Publication/add-publication/add-publication.component';
import { EditPublicationComponent } from './Publication/edit-publication/edit-publication.component';
import { PublicationComponent } from './Publication/publication/publication.component';
import { AddUserExpertiseComponent } from './UserExpertises/add-user-expertise/add-user-expertise.component';
import { EditUserExpertiseComponent } from './UserExpertises/edit-user-expertise/edit-user-expertise.component';
import { UserExpertisesComponent } from './UserExpertises/user-expertises/user-expertises.component';
import { EditTeachingExperienceComponent } from './TeachingExperience/edit-teaching-experience/edit-teaching-experience.component';
import { PaypalComponent } from '../Components/PaymentMethod/paypal/paypal.component';
import { StripeComponent } from '../Components/PaymentMethod/stripe/stripe.component';
import { WesternUnionComponent } from '../Components/PaymentMethod/western-union/western-union.component';
import { AddUserSkillsComponent } from './UserSkills/add-user-skills/add-user-skills.component';
import { EditUserSkillsComponent } from './UserSkills/edit-user-skills/edit-user-skills.component';
import { UserSkillsComponent } from './UserSkills/user-skills/user-skills.component';
import { AcadmicActivitesComponent } from './AcadmicActivity/acadmic-activites/acadmic-activites.component';
import { AddAcadmicActivityComponent } from './AcadmicActivity/add-acadmic-activity/add-acadmic-activity.component';
import { EditAcadmicActivityComponent } from './AcadmicActivity/edit-acadmic-activity/edit-acadmic-activity.component';
import { MessagesComponent } from '../Components/Messages/messages/messages.component';
import { AddMessageComponent } from '../Components/Messages/add-message/add-message.component';
import { CrowdFundingListComponent } from '../Components/CrowdFunding/crowd-funding-list/crowd-funding-list.component';
import { AddCrowdFundingComponent } from '../Components/CrowdFunding/add-crowd-funding/add-crowd-funding.component';
import { DetailsCrowdFundingComponent } from '../Components/CrowdFunding/details-crowd-funding/details-crowd-funding.component';
import { ProfileComponent } from '../Components/ProfileData/profile/profile.component';
import { AcadamicPositionListComponent } from '../Components/ProfileData/acadamic-position-list/acadamic-position-list.component';
import { AcadamicActivityListComponent } from '../Components/ProfileData/acadamic-activity-list/acadamic-activity-list.component';
import { EducationLevelListComponent } from '../Components/ProfileData/education-level-list/education-level-list.component';
import { PublicationListComponent } from '../Components/ProfileData/publication-list/publication-list.component';
import { TeachingExperienceListComponent } from '../Components/ProfileData/teaching-experience-list/teaching-experience-list.component';
import { PaymentComponent } from '../Components/PaymentMethod/payment/payment.component';
import { TeachingExperienceComponent } from './TeachingExperience/teaching-experience/teaching-experience.component';
import { AddInnovativeIdeaComponent } from '../user-pages/UserBadges/add-innovative-idea/add-innovative-idea.component';
import { SentMessageComponent } from '../Components/Messages/sent-message/sent-message.component';
import { InboxMessageComponent } from '../Components/Messages/inbox-message/inbox-message.component';
import { MessageDetailsComponent } from '../Components/Messages/message-details/message-details.component';
import { ArchivedComponent } from '../Components/Messages/archived/archived.component';
import { StatementsComponent } from '../Components/ProfileData/statements/statements.component';
import { UserAddressComponent } from '../Components/Address/user-address/user-address.component';
import { AddAddressComponent } from '../Components/Address/add-address/add-address.component';
import { EditAddressComponent } from '../Components/Address/edit-address/edit-address.component';
import { EventsComponent } from '../Components/events/events.component';
import { AddTeachingExperienceComponent } from './TeachingExperience/add-teaching-experience/add-teaching-experience.component';
import { MainPageComponent } from './ScientificTweets/main-page/main-page.component';
import { MyAridCertificateComponent } from './Certificates/my-arid-certificate/my-arid-certificate.component';
import { DetailsAridCertificateComponent } from '../user-pages/AridCertificate/details-arid-certificate/details-arid-certificate.component';
import { DetailsCertificateComponent } from './Certificates/details-certificate/details-certificate.component';
import { PaymentDetailsComponent } from '../Components/PaymentMethod/payment-details/payment-details.component';
import { PartnerComponent } from '../Components/PaymentMethod/partner/partner.component';
import { MemberShipLetterComponent } from '../Components/member-ship-letter/member-ship-letter.component';
import { IssueCertificateComponent } from './Certificates/issue-certificate/issue-certificate.component';
 
const routes: Routes = [

  {
    path: '', component: ClientPagesComponent,
    children: [
    { path: '', pathMatch: 'full', redirectTo: 'Home' },
    {path:'Pages',component:PagesComponent ,children:[
      { path: '', redirectTo: 'Info', pathMatch: 'full' } ,
      {path:"Info",component:UserInfoComponent},
      {path:"Cv",component:UserCvComponent},
      {path:"Summery",component:UserSummeryComponent},
      {path:"Contact",component:UserContactComponent},
      {path:"Password",component:ChangePasswordComponent},
      {path:"InviteFriend",component:InviteFriendComponent} ,
      {path:"PaymentMethod",component:PaymentComponent},
      {path:"Partner",component:PartnerComponent},
     {path:"Partner/Add",component:AddPartnerComponent},
      {path:"WesternUnion",component:WesternUnionComponent},
     {path:"PartnerList",component:AddPartnerComponent},
     {path:"PayPal",component:PaypalComponent},
     {path:"Stripe",component:StripeComponent},
     {path:"Stripe/Details/:id",component:PaymentDetailsComponent},
      {path:"CreditSystem/Add",component:UserAddCreditSystemComponent},
      {path:"CreditSystem/Edit/:id",component:UserEditCreditSystemComponent},
      {path:"CreditSystem",component:UserShowCreditSystemComponent},
      {path:"Statements",component:StatementsComponent},
      {path:"Addresses",component:UserAddressComponent},
      {path:"Addresses/Add",component:AddAddressComponent},
      {path:"Addresses/Edit/:id",component:EditAddressComponent},

        {path:"MemberShipLetter",component:MemberShipLetterComponent},

    ]},
    {path:"AcadmicActivites",component:AcadmicActivitesComponent},
    {path:"AcadmicActivites/Add",component:AddAcadmicActivityComponent},
    {path:"AcadmicActivites/Edit/:id",component:EditAcadmicActivityComponent},

    {path:"AcademicPosition",component:AcademicPositionComponent},
    {path:"AcademicPosition/Add",component:AddAcademicPositionComponent},
    {path:"AcadmicPosition/Edit/:id",component:EditAcademicPositionComponent},

    {path:"EducationalLevel",component:EducationalLevelsComponent},
    {path:"EducationalLevel/Add",component:AddEducationalLevelComponent},
    {path:"EducationalLevel/Edit/:id",component:EditEducationalLevelComponent},


    {path:"UserSkill",component:UserSkillsComponent},
    {path:"UserSkill/Add",component:AddUserSkillsComponent},
    {path:"UserSkill/Edit/:id",component:EditUserSkillsComponent},

    {path:"UserExpertise",component:UserExpertisesComponent},
    {path:"UserExpertise/Add",component:AddUserExpertiseComponent},
    {path:"UserExpertise/Edit/:id",component:EditUserExpertiseComponent},

    {path:"TeachingExperience",component:TeachingExperienceComponent},
    {path:"TeachingExperience/Add",component:AddTeachingExperienceComponent},
    {path:"TeachingExperience/Edit/:id",component:EditTeachingExperienceComponent},

    {path:"Project",component:ProjectsComponent},
    {path:"Project/Add",component:AddprojectComponent},
    {path:"Project/Edit/:id",component:EditprojectComponent},

    {path:"ProfileLink",component:ProfileLinksComponent},
    {path:"ProfileLink/Add",component:AddProfileLinksComponent},
    {path:"ProfileLink/Edit/:id",component:EditProfileLinksComponent},

    {path:"Publication",component:PublicationComponent},
    {path:"Publication/Add",component:AddPublicationComponent},
    {path:"Publication/Edit/:id",component:EditPublicationComponent},

    {path:"MemberShip",component:MemberShipComponent},

    {path:"Badges",component:ShowBadgesComponent},
    {path:"Badges/Details/:id",component:DetailsComponent},
 
   
    {path:"Donate",component:DonateComponent},
    {path:"Donate/Add",component:AddDonateComponent},


    

  {path:'Messages',component:MessagesComponent,children:
    [
      {path:'',redirectTo:'InboxMessages',pathMatch:"full"},
      {path:"SentMessages",component:SentMessageComponent},
      {path:"InboxMessages",component:InboxMessageComponent},
      {path:"Archive",component:ArchivedComponent},
      {path:"Details/:id",component:MessageDetailsComponent}

    ]},
 

  {path:"CrowdFunding",component:CrowdFundingListComponent},
  {path:"CrowdFunding/Add",component:AddCrowdFundingComponent},
  {path:"CrowdFunding/Details/:id",component: DetailsCrowdFundingComponent},

  {path:"Profile/:id",component:ProfileComponent,children:[
    { path: '', redirectTo: 'AcadamicPosition', pathMatch: 'full' } ,
    {path:"AcadamicPosition",component:AcadamicPositionListComponent},
    {path:"AcadamicActivity",component:AcadamicActivityListComponent},
    {path:"EducationLevel",component:EducationLevelListComponent},
    {path:"Publication",component:PublicationListComponent},
    {path:"TeachingExperience",component:TeachingExperienceListComponent}
   
  ]},
   
  {path:"Events",component: EventsComponent},
  {path:"Home",component:MainPageComponent},
  {path:"Certificates",component:MyAridCertificateComponent},
  {path:"Certificates/Details/:id",component:DetailsCertificateComponent},
  {path:"Certificates/Issue",component:IssueCertificateComponent},




  
]} 

]
  

   

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPagesRoutingModule {


}
