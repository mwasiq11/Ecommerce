import dotenvv from 'dotenv'

dotenvv.config({quiet:true})

const ENV={
	PORT:process.env.PORT || 3000,
	MONGO_URI:process.env.MONGO_URI
}

export default ENV;