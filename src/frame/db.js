import Gun from 'gun'
import 'gun/sea'

export const gun = Gun({})

export const user = gun.user()