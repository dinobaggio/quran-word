import _ from "lodash"
import fs from 'fs'
import { getSurah } from "../../libs/services/quranService"


export async function syncQuran(req, res, next) {
  try {
    const { surah_number } = req.query
    const initQuran = await getSurah(surah_number, { page: 1 }) || {}
    const { pagination } = initQuran || {}
    const { total_pages } = pagination || {}
    
    if (!total_pages) return res.status(400).json({ message: 'total page not found' })

    const store = []
    for (let index = 0; index < total_pages; index++) {
      const data = await getSurah(surah_number, {
        page: index + 1,
      })

      let { verses } = data
      
      verses = verses.forEach((verse) => {
        let words = verse.words.map((word) => ({
          ..._.pick(word, ['text_uthmani', 'char_type_name']),
          translation: word?.translation?.text || null,
        }))
        words = words.filter(item => item.char_type_name !== 'end')
        store.push({
          ..._.pick(verse, ['verse_number']),
          words
        })
      })
    }

    fs.writeFileSync(`output/${surah_number}.json`, JSON.stringify(store), (err) => {
      if (err) {
        console.error(err)
      }
    })

    return res.status(200).json({
      message: 'Synchronize success, please check the folder server /output',
      data: store
    })
  } catch (err) {
    next(err)
  }
}

export async function topWordQuran(req, res, next) {
  try {
    const { surah_number } = req.query
    if (!fs.existsSync(`output/${surah_number}.json`)) {
      return res.status(400).json({ message: 'file not found' })
    }

    const data = fs.readFileSync(`output/${surah_number}.json`, 'utf-8')
    const parsedData = JSON.parse(data)
    const store = []
    parsedData.forEach((verse) => {
      verse.words.forEach((word) => {
        store.push({
          ...word,
          translation: String(word.translation).toLowerCase(),
        })
      })
    })
    const groups = _.groupBy(store, 'translation')
    let result = []
    Object.keys(groups).forEach((key) => {
      const group = groups[key]
      const count = group.length
      const word = group[0]
      result.push({ ...word, count })
    })
    result = _.orderBy(result, ['count'], ['desc'])
    return res.status(200).json({ message: 'success', data: result })
  } catch (err) {
    next(err)
  }
}