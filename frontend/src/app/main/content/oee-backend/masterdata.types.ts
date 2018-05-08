export class Stop {
  nodeId?: string;
  stopId: string;
  stopName: string;
  stopType: string;
  stopResEmail: string;
  stopCreateAt?: string;
  __typename?: string;

  constructor(stop) {
    this.stopId = stop.stopId || '';
    this.stopName = stop.stopName || '';
    this.stopType = stop.stopType || '';
    this.stopResEmail = stop.stopResEmail || '';
    this.stopCreateAt = stop.stopCreateAt || '';
  }
}



// export class Contact
// {
//     id: string;
//     name: string;
//     lastName: string;
//     avatar: string;
//     nickname: string;
//     company: string;
//     jobTitle: string;
//     email: string;
//     phone: string;
//     address: string;
//     birthday: string;
//     notes: string;

//     constructor(contact)
//     {
//         {
//             this.id = contact.id || FuseUtils.generateGUID();
//             this.name = contact.name || '';
//             this.lastName = contact.lastName || '';
//             this.avatar = contact.avatar || 'assets/images/avatars/profile.jpg';
//             this.nickname = contact.nickname || '';
//             this.company = contact.company || '';
//             this.jobTitle = contact.jobTitle || '';
//             this.email = contact.email || '';
//             this.phone = contact.phone || '';
//             this.address = contact.address || '';
//             this.birthday = contact.birhday || '';
//             this.notes = contact.notes || '';
//         }
//     }
// }
