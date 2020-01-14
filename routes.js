{
  routes: [
    {
      match: {
        path: '/christmas-slippers'
      },
      next: {
        page: '/s/[subcategoryId]',
        params: 'subcategoryId=christmas-slippers'
      }
    },
    {
      next: true
    },
    {
      proxy: {
        origin: 'origin'
      }
    }
  ]
}
