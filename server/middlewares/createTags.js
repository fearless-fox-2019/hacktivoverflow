const Tag = require('../models/tags')


module.exports = async (req, res, next) => {
  try {
    const tagsInput = req.body.tags
    const tags = await Tag.find()
    let existTag = []
    let createArr = []

    for(let i in tagsInput) {
      let found = false
      tags.forEach(tag => {
        if(tag.name == tagsInput[i]) {
          existTag.push(tag._id)
          found = true
        }
      });
      if(!found) {
        createArr.push(Tag.create({name : tagsInput[i]}))
      }
    }

    const newTags = await Promise.all(createArr)
    newTags.forEach(x => existTag.push(x._id))
    req.body.tags = existTag
    next()
  } catch (error) {
    next(error)
  }
}