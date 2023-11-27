import { UploadedFile } from "express-fileupload"
import credentials from "../../google_cloud_credentials.json"
import { drive_v3, google } from "googleapis"

const SCOPES = ["https://www.googleapis.com/auth/drive.file"]
const USERS_FOLDER = "19sH4ubRz1anzI_uv0oU91aO3Ox4THMKW"

const authorize = async () => {
    const jwtClient = new google.auth.JWT(credentials.client_email, undefined, credentials.private_key, SCOPES)
    await jwtClient.authorize()
    return jwtClient
}

const createUserFolder = async (drive: drive_v3.Drive, user_id: string) => {
    const folder = await drive.files.create({
        fields: "id",
        requestBody: {
            name: user_id,
            mimeType: "application/vnd.google-apps.folder",
            parents: [USERS_FOLDER]
        }
    })

    return folder.data.id
}

const findFolder = async (drive: drive_v3.Drive, user_id: string) => {
    const response = await drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name='${user_id}' and '${USERS_FOLDER}' in parents and trashed=false`,
        spaces: "drive",
        fields: "files(id, name)",
        pageSize: 1
    })

    const files = response.data.files
    if (files) {
        const folder = files.length > 0 ? files[0] : null
        return folder
    }

    return null
}

const uploadUserImage = async (file: UploadedFile, user_id: string) => {
    const authClient = await authorize()
    const drive = google.drive({ version: "v3", auth: authClient })

    let userFolder = await findFolder(drive, user_id)

    if (!userFolder) {
        userFolder = { id: await createUserFolder(drive, user_id) }
    }

    const gfile = await drive.files.create({
        media: {
            mimeType: file.mimetype,
            body: file.data
        },
        fields: "id",
        requestBody: {
            parents: [userFolder.id?.toString() || USERS_FOLDER],
            name: file.name
        }
    })

    return gfile.data.id
}

export default { uploadUserImage }
