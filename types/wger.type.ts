interface MuscleGroup {
  id: number
  name: string
  name_en: string
  is_front: boolean
  image_url_main: string
  image_url_secondary: string
}

export interface MuscleTypesResponse {
  count: number
  next: string | null
  previous: string | null
  results: MuscleGroup[]
}


export interface Exercise {
  category: number
  creation_date: string
  description: string
  equipment: number[]
  exercise_base: number
  id: number
  language: number
  license: number
  license_author: string
  muscles: number[]
  muscles_secondary: number[]
  name: string
  uuid: string
  variations: number[]
}

export interface ExerciseResponse {
  count: number
  next: string | null
  previous: string | null
  results: Exercise[]
}