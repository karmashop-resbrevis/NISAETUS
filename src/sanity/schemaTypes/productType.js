import {defineField, defineType} from "sanity";
import {TrolleyIcon} from "@sanity/icons";

export const productType = defineType ({
    name: 'product',
    title: 'Produk',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField ({
            name: 'title',
            title: 'Nama Produk',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'images',
            title: 'Gambar Produk',
            type: 'array',
            of: [{
                type: 'image',
                options: {
                    hotspot: true,
                },
            }],
        }),
        defineField({
            name: 'banner',
            title: 'Banner Image',
            type: 'image',
        }),
        defineField({
            name: 'intro',
            title: 'Produk Teks Intro',
            type: 'text',
        }),
        defineField({
            name: 'displayTitle1',
            type: 'string',
        }),
        defineField({
            name: 'displayText1',
            type: 'text',
        }),
        defineField({
            name: 'displayTitle2',
            type: 'string',
        }),
        defineField({
            name: 'displayText2',
            type: 'text',
        }),
        defineField({
            name: 'displayTitle3',
            type: 'string',
        }),
        defineField({
            name: 'displayText3',
            type: 'text',
        }),
        defineField({
            name: 'displayTitle4',
            type: 'string',
        }),
        defineField({
            name: 'displayText4',
            type: 'text',
        }),
        defineField({
            name: 'displayTitle5',
            type: 'string',
        }),
        defineField({
            name: 'displayText5',
            type: 'text',
        }),
        defineField({
            name: 'description',
            title: 'Deskripsi Produk',
            type: 'text',
        }),
        defineField({
            name: 'price',
            title: 'Harga Produk',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'discount',
            title: 'Harga Diskon',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gender',
            title: 'Tipe Gender Produk',
            type: 'array',
            of: [{
                type: 'reference',
                to: {
                    type: 'gender'
                },
            }],
        }),
        defineField({
            name: 'stock',
            title: 'Stok Produk',
            type: 'number',
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: 'status',
            title: 'Status Produk',
            type: 'string',
            options: {
                list:[
                    {title: 'New', value: 'new'},
                    {title: 'Hot', value: 'hot'},
                    {title: 'Sale', value: 'sale'},
                    {title: 'Featured', value: 'featured'}
                ],
            },
        }),
        defineField({
            name: 'category',
            title: 'Kategori Produk',
            type: 'string',
            options: {
                list: [
                    {title: 'Accessories', value: 'accessories'},
                    {title: 'Bags', value: 'Bags'},
                    {title: 'Coats', value: 'Coats'},
                    {title: 'Jackets', value: 'Jackets'},
                    {title: 'Shoes', value: 'Shoes'},
                    {title: 'Hoodies', value: 'Hoodies'},
                    {title: 'Others', value: 'Others'},
                    {title: 'Blazers', value: 'Blazers'},
                ],
            },
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'images',
            subtitle: 'price',
        },
        prepare(selection) {
            const {title,subtitle,media}=selection;
            const image=media && media[0];
            return {
                title:title,
                subtitle: `Rp. ${subtitle}`,
                media:image
            };
        },
    },
});