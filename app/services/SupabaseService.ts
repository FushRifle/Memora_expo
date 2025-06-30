import { supabase } from '@/app/lib/client'
import * as FileSystem from 'expo-file-system'

type DocumentPickerSuccessResult = {
    type: 'success'
    uri: string
    name?: string
    size?: number
    mimeType?: string
}

type DocumentPickerCanceledResult = {
    type: 'cancel'
}

type DocumentPickerResult = DocumentPickerSuccessResult | DocumentPickerCanceledResult

/**
 * uploadToSupabase: uploads local file to Supabase Storage and returns its public URL
 */
export async function uploadToSupabase(uri: string, filename: string): Promise<string> {
    try {
        // Read file as base64 and convert to Uint8Array
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
        const fileBuffer = Uint8Array.from(atob(base64), c => c.charCodeAt(0))

        // Upload to Supabase Storage bucket (e.g., "documents")
        const { data, error } = await supabase
            .storage
            .from('documents') // replace 'documents' with your actual bucket name
            .upload(filename, fileBuffer, {
                contentType: 'application/pdf' // adjust if needed
                // upsert: true // optional: overwrite if same filename
            })

        if (error) {
            console.error('Supabase upload failed:', error)
            throw error
        }

        // Get public URL
        const { data: publicUrlData } = supabase
            .storage
            .from('documents')
            .getPublicUrl(filename)

        return publicUrlData?.publicUrl ?? ''
    } catch (error) {
        console.error('Upload failed:', error)
        throw error
    }
}
