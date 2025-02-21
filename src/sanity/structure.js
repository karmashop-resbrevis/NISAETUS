// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Nisaetus')
    .items([
      S.documentTypeListItem('gender').title('Kategori Gender'),
      S.documentTypeListItem('product').title('Produk'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['gender', 'product'].includes(item.getId()),
      ),
    ])
