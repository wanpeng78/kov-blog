/**
 * @file
 * @author chuck7 (chuck7liu@gmail.com)
 * @data 17/5/25
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const utils = require('../util')

const draftSchema = new Schema({
    title: String,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }],
    createTime: {
        type: Date
    },
    lastEditTime: {
        type: Date,
        default: Date.now
    },
    excerpt: String,
    content: String,
    article: {
        type: Schema.Types.ObjectId,
        ref: 'tag'
    },
    draftPublished: Boolean
}, {
    versionKey: false,
    skipVersioning: { tags: true }
})

draftSchema.set('toJSON', {
    getters: true,
    virtuals: true
})
draftSchema.set('toObject', {
    getters: true,
    virtuals: true
})

draftSchema
    .path('createTime')
    .get(function (v) {
        return utils.formatDate(new Date(v), 'yyyy-MM-dd hh:mm:ss')
    })
draftSchema
    .path('lastEditTime')
    .get(function (v) {
        return utils.formatDate(new Date(v), 'yyyy-MM-dd hh:mm:ss')
    })

const draft = mongoose.model('draft', draftSchema)
module.exports = draft