import { ref } from 'vue'

interface User {
  id: string
  email: string
  emailVerified: boolean
  role: string
  createdAt: string
  profile?: {
    fullName: string
    phone: string
    city: string
  } | null
}

interface Application {
  id: string
  userId: string
  category: 'starter' | 'active' | 'it'
  summary: string
  planFilePath: string | null
  videoFilePath: string | null
  status: 'draft' | 'submitted'
  createdAt: string
  updatedAt: string
  user?: {
    email: string
    profile?: {
      fullName: string
      phone: string
      city: string
    } | null
  }
}

interface ApplicationStats {
  total: number
  byStatus: {
    draft?: number
    submitted?: number
  }
  byCategory: {
    starter?: number
    active?: number
    it?: number
  }
}

interface GetApplicationsParams {
  status?: 'draft' | 'submitted'
  category?: 'starter' | 'active' | 'it'
  page?: number
  limit?: number
}

interface GetApplicationsResponse {
  applications: Application[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export const useAdmin = () => {
  const { fetchWithAuth } = useAuth()
  const config = useRuntimeConfig()

  const applications = ref<Application[]>([])
  const users = ref<User[]>([])
  const stats = ref<ApplicationStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Get all applications with optional filters
   */
  const getAllApplications = async (params?: GetApplicationsParams) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      if (params?.status) queryParams.append('status', params.status)
      if (params?.category) queryParams.append('category', params.category)
      if (params?.page) queryParams.append('page', params.page.toString())
      if (params?.limit) queryParams.append('limit', params.limit.toString())

      const queryString = queryParams.toString()
      const url = `${config.public.apiUrl}/admin/applications${queryString ? `?${queryString}` : ''}`

      const response = await fetchWithAuth<{ success: boolean; data: GetApplicationsResponse }>(url)
      applications.value = response.data.applications
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch applications'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Update application status
   */
  const updateApplicationStatus = async (
    applicationId: string,
    status: 'draft' | 'submitted'
  ) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetchWithAuth<{ success: boolean; data: Application }>(
        `${config.public.apiUrl}/admin/applications/${applicationId}/status`,
        {
          method: 'PUT',
          body: { status },
        }
      )

      // Update local state
      const index = applications.value.findIndex((app) => app.id === applicationId)
      if (index !== -1) {
        applications.value[index] = response.data
      }

      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to update application status'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get all users
   */
  const getAllUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetchWithAuth<{ success: boolean; data: { users: User[] } }>(
        `${config.public.apiUrl}/admin/users`
      )
      users.value = response.data.users
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch users'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get application statistics
   */
  const getStats = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetchWithAuth<{ success: boolean; data: ApplicationStats }>(
        `${config.public.apiUrl}/admin/stats`
      )
      stats.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch statistics'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    applications,
    users,
    stats,
    loading,
    error,
    getAllApplications,
    updateApplicationStatus,
    getAllUsers,
    getStats,
  }
}
