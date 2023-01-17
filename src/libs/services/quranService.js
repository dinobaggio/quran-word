import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.qurancdn.com/api/qdc/verses/by_chapter',
})

export async function getSurah(surah_number, params = {}) {
  const {
    words = true,
    translation_fields = 'resource_name,language_id',
    per_page = 5,
    fields = 'text_uthmani,chapter_id,hizb_number,text_imlaei_simple',
    translations = 134,
    reciter = 7,
    word_translation_language = 'id',
    word_fields = 'verse_key,verse_id,page_number,location,text_uthmani,code_v1,qpc_uthmani_hafs',
    mushaf = '2',
    page = 1
  } = params

  const res = await instance.get(`/${surah_number}`, {
    params: {
      words,
      per_page,
      fields,
      translations,
      translation_fields,
      reciter,
      word_translation_language,
      word_fields,
      mushaf,
      page
    }
  })

  return res.data
}