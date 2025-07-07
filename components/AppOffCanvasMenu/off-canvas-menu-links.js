import LinkItemContext from './LinkItemContext.js'

export default {
  'GraphQL API': [
    LinkItemContext.create({
      text: 'Curriculums',
      href: '/samples/curriculums',
    }),
    LinkItemContext.create({
      text: 'Company Sponsors',
      href: '/samples/company-sponsors',
    }),
    LinkItemContext.create({
      text: 'Sign Up',
      href: '/samples/sign-up',
    }),
    LinkItemContext.create({
      text: 'Sign In',
      href: '/samples/sign-in',
    }),
    LinkItemContext.create({
      text: 'Upload Image',
      href: '/samples/upload-image',
    }),
    LinkItemContext.create({
      text: 'Pagination Articles',
      href: '/samples/pagination-articles',
    }),
  ],
  'RESTful API': [
    LinkItemContext.create({
      text: 'RESTful API Client',
      href: '/samples/restfulapi',
    }),
  ],
  Features: [
    LinkItemContext.create({
      text: 'Form Controls Inspector',
      href: '/samples/form-controls-inspector',
    }),
    LinkItemContext.create({
      text: 'Trigger Unlock Sample',
      href: '/samples/trigger-unlock',
    }),
  ],
  Components: [
    LinkItemContext.create({
      text: '<FuroPagination>',
      href: '/samples/components/furo-pagination',
    }),
    LinkItemContext.create({
      text: '<FuroTabLayout>',
      href: '/samples/components/furo-tab-layout',
    }),
    LinkItemContext.create({
      text: '<FuroDialog>',
      href: '/samples/components/furo-dialog',
    }),
    LinkItemContext.create({
      text: '<FuroLoadingLayout>',
      href: '/samples/components/furo-loading-layout',
    }),
  ],
  'Vue Features': [
    LinkItemContext.create({
      text: 'computed() via Context',
      href: '/samples/context/using-computed',
    }),
  ],
  Subscription: [
    LinkItemContext.create({
      text: 'Chat Room [1]',
      href: '/samples/chat-room?room=1',
    }),
    LinkItemContext.create({
      text: 'Chat Room [2]',
      href: '/samples/chat-room?room=2',
    }),
  ],
}
