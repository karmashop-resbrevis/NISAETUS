import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const genderType = defineType({
  name: 'gender',
  title: 'Kategori Gender',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Gender',
      type: 'string',
    }),
    defineField({
      name: 'displayText',
      title: 'Display Text',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'banner',
      title: 'Kategori Image',
      type: 'image',
  }),
    defineField({
      name: 'description',
      type: 'text',
    }),
  ],
})
