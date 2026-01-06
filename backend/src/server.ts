import app from './app'
import { AppDataSource } from './database/data-source'

AppDataSource.initialize().then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
