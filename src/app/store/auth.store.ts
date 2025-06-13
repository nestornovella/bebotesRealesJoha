import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthData {
  authorizated: boolean

}

interface AuthProps {
  pass: AuthData
  setPass: (pass: string) => void
  getPass: () => AuthData
  removePass:()=> void
}

export const useAuthStore = create<AuthProps>()(
  persist(
    (set, get) => ({
      pass: {
        authorizated: false,
      },

      setPass: (pass: string) => {
        const truePass = process.env.NEXT_PUBLIC_PASS
        if (truePass === pass) {
          set({
            pass: {
              authorizated: true,
            }
          })
        }
      },

      getPass: () => get().pass,

      removePass: ()=>{
        set({
            pass:{
                authorizated:false
            }
        })

      }


    }),
    {
      name: 'auth',
      partialize: (state) => ({ pass: state.pass }),
    }
  )
)
