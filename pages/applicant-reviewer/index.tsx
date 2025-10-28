import React, { useState, useRef, useCallback, useEffect } from 'react'
import * as XLSX from 'xlsx'
import toast, { Toaster } from 'react-hot-toast'
import {
    ChevronLeft,
    ChevronRight,
    Upload,
    Check,
    X,
    SkipForward,
    Download,
    BarChart3,
    FileText,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ExternalLink,
    Filter,
    Keyboard,
    Zap,
    ChevronsRight,
    Star,
    Undo2,
    Search,
    Hash,
} from 'lucide-react'

interface Applicant {
    [key: string]: any
}

interface ApplicantStatus {
    [index: number]: 'pending' | 'selected' | 'rejected' | 'skipped'
}

export default function ApplicantReviewer() {
    const [applicants, setApplicants] = useState<Applicant[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [statuses, setStatuses] = useState<ApplicantStatus>({})
    const [showSummary, setShowSummary] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [autoAdvance, setAutoAdvance] = useState(true)
    const [filterStatus, setFilterStatus] = useState<
        'all' | 'pending' | 'selected' | 'rejected' | 'skipped'
    >('all')
    const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [starred, setStarred] = useState<Set<number>>(new Set())
    const [history, setHistory] = useState<
        Array<{
            index: number
            status: 'pending' | 'selected' | 'rejected' | 'skipped'
        }>
    >([])
    const [showJumpTo, setShowJumpTo] = useState(false)
    const [jumpToIndex, setJumpToIndex] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
            if (!file) return

            setIsLoading(true)
            const reader = new FileReader()

            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer)
                    const workbook = XLSX.read(data, { type: 'array' })
                    const sheetName = workbook.SheetNames[0]
                    const worksheet = workbook.Sheets[sheetName]
                    const jsonData = XLSX.utils.sheet_to_json(worksheet)

                    setApplicants(jsonData as Applicant[])
                    setCurrentIndex(0)
                    setStatuses({})
                    setShowSummary(false)
                } catch (error) {
                    console.error('Error parsing Excel file:', error)
                    alert(
                        "Error parsing Excel file. Please make sure it's a valid Excel file."
                    )
                } finally {
                    setIsLoading(false)
                }
            }

            reader.readAsArrayBuffer(file)
        },
        []
    )

    const updateStatus = (
        index: number,
        status: 'selected' | 'rejected' | 'skipped'
    ) => {
        // Save to history for undo
        const previousStatus = statuses[index] || 'pending'
        setHistory((prev) => [...prev, { index, status: previousStatus }])

        setStatuses((prev) => ({ ...prev, [index]: status }))

        // Show toast notification
        const messages = {
            selected: '✅ Applicant selected',
            rejected: '❌ Applicant rejected',
            skipped: '⏭️ Applicant skipped',
        }
        toast.success(messages[status], { duration: 2000 })

        // Auto-advance to next applicant
        if (autoAdvance && currentIndex < applicants.length - 1) {
            setTimeout(() => {
                navigateApplicant('next')
            }, 300)
        }
    }

    const undoLastAction = () => {
        if (history.length === 0) return

        const lastAction = history[history.length - 1]
        setStatuses((prev) => ({
            ...prev,
            [lastAction.index]: lastAction.status,
        }))
        setHistory((prev) => prev.slice(0, -1))
        setCurrentIndex(lastAction.index)
        toast('↩️ Action undone', { duration: 2000 })
    }

    const jumpToApplicant = () => {
        const index = parseInt(jumpToIndex) - 1 // Convert to 0-based index
        if (isNaN(index) || index < 0 || index >= applicants.length) {
            toast.error('Invalid applicant number')
            return
        }
        setCurrentIndex(index)
        setShowJumpTo(false)
        setJumpToIndex('')
        toast.success(`Jumped to applicant #${index + 1}`)
    }

    const toggleStar = (index: number) => {
        setStarred((prev) => {
            const newStarred = new Set(prev)
            if (newStarred.has(index)) {
                newStarred.delete(index)
                toast('⭐ Star removed')
            } else {
                newStarred.add(index)
                toast('⭐ Applicant starred')
            }
            return newStarred
        })
    }

    const bulkAction = (
        action: 'selected' | 'rejected' | 'skipped',
        indices?: number[]
    ) => {
        const targetIndices =
            indices || filteredApplicants.map((item) => item.originalIndex)
        const newStatuses = { ...statuses }
        targetIndices.forEach((index) => {
            newStatuses[index] = action
        })
        setStatuses(newStatuses)
    }

    const navigateApplicant = (direction: 'prev' | 'next') => {
        if (direction === 'prev' && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        } else if (
            direction === 'next' &&
            currentIndex < applicants.length - 1
        ) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const skipToNextPending = () => {
        for (let i = currentIndex + 1; i < applicants.length; i++) {
            if (!statuses[i] || statuses[i] === 'pending') {
                setCurrentIndex(i)
                toast.success(`Jumped to next pending applicant (#${i + 1})`)
                return
            }
        }
        toast('No more pending applicants!', { icon: '🎉' })
    }

    const getStatusCounts = () => {
        const counts = { selected: 0, rejected: 0, skipped: 0, pending: 0 }
        applicants.forEach((_, index) => {
            const status = statuses[index] || 'pending'
            counts[status]++
        })
        return counts
    }

    const getSelectedApplicants = () => {
        return applicants.filter((_, index) => statuses[index] === 'selected')
    }

    const downloadSelected = () => {
        const selected = getSelectedApplicants()
        if (selected.length === 0) {
            alert('No applicants selected for download.')
            return
        }

        const ws = XLSX.utils.json_to_sheet(selected)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Selected Applicants')
        XLSX.writeFile(wb, 'selected-applicants.xlsx')
    }

    // Filter and search logic
    const filteredApplicants = applicants
        .map((applicant, index) => ({ applicant, originalIndex: index }))
        .filter(({ applicant, originalIndex }) => {
            // Filter by status
            if (filterStatus !== 'all') {
                const status = statuses[originalIndex] || 'pending'
                if (status !== filterStatus) return false
            }

            // Filter by search query
            if (searchQuery) {
                const searchLower = searchQuery.toLowerCase()
                return Object.values(applicant).some((value) =>
                    String(value).toLowerCase().includes(searchLower)
                )
            }

            return true
        })

    const currentApplicant = applicants[currentIndex]
    const statusCounts = getStatusCounts()

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Don't trigger shortcuts when typing in input fields
            if (e.target instanceof HTMLInputElement) return

            switch (e.key.toLowerCase()) {
                case 's':
                    updateStatus(currentIndex, 'selected')
                    break
                case 'r':
                    updateStatus(currentIndex, 'rejected')
                    break
                case 'k':
                    updateStatus(currentIndex, 'skipped')
                    break
                case 'arrowleft':
                    navigateApplicant('prev')
                    break
                case 'arrowright':
                    navigateApplicant('next')
                    break
                case 'f':
                    toggleStar(currentIndex)
                    break
                case 'u':
                case 'z':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault()
                        undoLastAction()
                    }
                    break
                case '?':
                    setShowKeyboardShortcuts(!showKeyboardShortcuts)
                    break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [currentIndex, statuses, showKeyboardShortcuts, autoAdvance])

    if (applicants.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 max-w-md w-full text-center shadow-sm border border-slate-200">
                    <Upload className="w-12 h-12 text-slate-600 mx-auto mb-6" />
                    <h1 className="text-2xl font-semibold text-slate-800 mb-4">
                        Job Applicant Reviewer
                    </h1>
                    <p className="text-slate-600 mb-6">
                        Upload an Excel file containing job applicant data to
                        start reviewing candidates.
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        {isLoading ? 'Processing...' : 'Upload Excel File'}
                    </button>
                </div>
            </div>
        )
    }

    if (showSummary) {
        const starredCount = starred.size
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-semibold text-slate-800">
                                Review Summary
                            </h1>
                            <button
                                onClick={() => setShowSummary(false)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors"
                            >
                                Back to Review
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                                <Check className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                                <div className="text-xl font-bold text-emerald-700">
                                    {statusCounts.selected}
                                </div>
                                <div className="text-emerald-600 text-sm">Selected</div>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                <X className="w-6 h-6 text-red-600 mx-auto mb-2" />
                                <div className="text-xl font-bold text-red-700">
                                    {statusCounts.rejected}
                                </div>
                                <div className="text-red-600 text-sm">Rejected</div>
                            </div>
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                                <SkipForward className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                                <div className="text-xl font-bold text-amber-700">
                                    {statusCounts.skipped}
                                </div>
                                <div className="text-amber-600 text-sm">Skipped</div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                                <User className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                <div className="text-xl font-bold text-slate-700">
                                    {statusCounts.pending}
                                </div>
                                <div className="text-slate-600 text-sm">Pending</div>
                            </div>
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                                <Star className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                                <div className="text-xl font-bold text-orange-700">
                                    {starredCount}
                                </div>
                                <div className="text-orange-600 text-sm">Starred</div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-slate-800 mb-4">
                                Quick Actions
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={downloadSelected}
                                    disabled={statusCounts.selected === 0}
                                    className="bg-emerald-100 hover:bg-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-emerald-200"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Selected ({statusCounts.selected})
                                </button>
                                <button
                                    onClick={() => {
                                        const starredApplicants =
                                            applicants.filter((_, idx) =>
                                                starred.has(idx)
                                            )
                                        if (starredApplicants.length === 0) {
                                            alert(
                                                'No starred applicants to download.'
                                            )
                                            return
                                        }
                                        const ws =
                                            XLSX.utils.json_to_sheet(
                                                starredApplicants
                                            )
                                        const wb = XLSX.utils.book_new()
                                        XLSX.utils.book_append_sheet(
                                            wb,
                                            ws,
                                            'Starred Applicants'
                                        )
                                        XLSX.writeFile(
                                            wb,
                                            'starred-applicants.xlsx'
                                        )
                                    }}
                                    disabled={starredCount === 0}
                                    className="bg-orange-100 hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed text-orange-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-orange-200"
                                >
                                    <Star className="w-4 h-4" />
                                    Download Starred ({starredCount})
                                </button>
                                <button
                                    onClick={() => {
                                        const ws =
                                            XLSX.utils.json_to_sheet(applicants)
                                        const wb = XLSX.utils.book_new()
                                        XLSX.utils.book_append_sheet(
                                            wb,
                                            ws,
                                            'All Applicants'
                                        )
                                        XLSX.writeFile(
                                            wb,
                                            'all-applicants.xlsx'
                                        )
                                    }}
                                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-blue-200"
                                >
                                    <Download className="w-4 h-4" />
                                    Download All
                                </button>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-slate-800 mb-4">
                                Bulk Actions
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <button
                                    onClick={() => {
                                        if (
                                            confirm(
                                                'Mark all pending applicants as selected?'
                                            )
                                        ) {
                                            const pendingIndices = applicants
                                                .map((_, idx) => idx)
                                                .filter(
                                                    (idx) =>
                                                        !statuses[idx] ||
                                                        statuses[idx] ===
                                                            'pending'
                                                )
                                            bulkAction(
                                                'selected',
                                                pendingIndices
                                            )
                                        }
                                    }}
                                    className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <Check className="w-4 h-4" />
                                    Select All Pending
                                </button>
                                <button
                                    onClick={() => {
                                        if (
                                            confirm(
                                                'Mark all pending applicants as rejected?'
                                            )
                                        ) {
                                            const pendingIndices = applicants
                                                .map((_, idx) => idx)
                                                .filter(
                                                    (idx) =>
                                                        !statuses[idx] ||
                                                        statuses[idx] ===
                                                            'pending'
                                                )
                                            bulkAction(
                                                'rejected',
                                                pendingIndices
                                            )
                                        }
                                    }}
                                    className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <X className="w-4 h-4" />
                                    Reject All Pending
                                </button>
                                <button
                                    onClick={() => {
                                        if (
                                            confirm(
                                                'Mark all starred applicants as selected?'
                                            )
                                        ) {
                                            const starredIndices =
                                                Array.from(starred)
                                            bulkAction(
                                                'selected',
                                                starredIndices
                                            )
                                        }
                                    }}
                                    className="bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <Star className="w-4 h-4" />
                                    Select All Starred
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto">
                {/* Compact Header with integrated search */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-semibold text-slate-800">
                                Applicant Reviewer
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <span className="font-medium">{currentIndex + 1}</span>
                                <span>of {applicants.length}</span>
                                {starred.has(currentIndex) && (
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                )}
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setShowJumpTo(true)}
                                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                                title="Jump to Applicant"
                            >
                                <Hash className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
                                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                                title="Keyboard Shortcuts"
                            >
                                <Keyboard className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setShowSummary(true)}
                                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <BarChart3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        {/* Search integrated in header */}
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search applicants..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Status counts */}
                        <div className="flex gap-2">
                            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1">
                                <span className="text-emerald-700 font-medium text-sm">
                                    {statusCounts.selected} Selected
                                </span>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-1">
                                <span className="text-red-700 font-medium text-sm">
                                    {statusCounts.rejected} Rejected
                                </span>
                            </div>
                            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-1">
                                <span className="text-amber-700 font-medium text-sm">
                                    {statusCounts.skipped} Skipped
                                </span>
                            </div>
                        </div>

                        {/* Quick controls */}
                        <div className="flex gap-2">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as any)}
                                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="selected">Selected</option>
                                <option value="rejected">Rejected</option>
                                <option value="skipped">Skipped</option>
                            </select>
                            
                            <button
                                onClick={() => setAutoAdvance(!autoAdvance)}
                                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                                    autoAdvance
                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                                }`}
                            >
                                <Zap className="w-4 h-4" />
                                Auto
                            </button>

                            <button
                                onClick={undoLastAction}
                                disabled={history.length === 0}
                                className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 rounded-lg transition-colors text-sm"
                                title="Undo (Ctrl/Cmd + Z)"
                            >
                                <Undo2 className="w-4 h-4" />
                                Undo
                            </button>

                            <button
                                onClick={skipToNextPending}
                                className="flex items-center gap-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
                                title="Jump to next unreviewed applicant"
                            >
                                <ChevronsRight className="w-4 h-4" />
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Keyboard Shortcuts Modal */}
                {showKeyboardShortcuts && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl border border-slate-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-slate-800">
                                    Keyboard Shortcuts
                                </h3>
                                <button
                                    onClick={() =>
                                        setShowKeyboardShortcuts(false)
                                    }
                                    className="text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-slate-700">
                                    <span className="text-slate-600">
                                        Select applicant
                                    </span>
                                    <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200 font-mono text-sm">
                                        S
                                    </kbd>
                                </div>
                                <div className="flex items-center justify-between text-slate-700">
                                    <span className="text-slate-600">
                                        Reject applicant
                                    </span>
                                    <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200 font-mono text-sm">
                                        R
                                    </kbd>
                                </div>
                                <div className="flex items-center justify-between text-slate-700">
                                    <span className="text-slate-600">
                                        Skip applicant
                                    </span>
                                    <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200 font-mono text-sm">
                                        K
                                    </kbd>
                                </div>
                                <div className="flex items-center justify-between text-slate-700">
                                    <span className="text-slate-600">
                                        Previous/Next
                                    </span>
                                    <div className="flex gap-1">
                                        <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200 font-mono text-sm">
                                            ←
                                        </kbd>
                                        <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200 font-mono text-sm">
                                            →
                                        </kbd>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-slate-700">
                                    <span className="text-slate-600">
                                        Star/Flag applicant
                                    </span>
                                    <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200 font-mono text-sm">
                                        F
                                    </kbd>
                                </div>
                                <div className="flex items-center justify-between text-slate-700">
                                    <span className="text-slate-600">
                                        Undo last action
                                    </span>
                                    <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200 font-mono text-sm">
                                        Ctrl+Z
                                    </kbd>
                                </div>
                                <div className="flex items-center justify-between text-slate-700">
                                    <span className="text-slate-600">
                                        Toggle shortcuts
                                    </span>
                                    <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200 font-mono text-sm">
                                        ?
                                    </kbd>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-700">
                                    💡 Tip: Enable auto-advance to automatically
                                    move to the next applicant after making a
                                    decision!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Jump To Modal */}
                {showJumpTo && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl border border-slate-200">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-slate-800">
                                    Jump to Applicant
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowJumpTo(false)
                                        setJumpToIndex('')
                                    }}
                                    className="text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-600 mb-2">
                                        Enter applicant number (1-
                                        {applicants.length})
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={applicants.length}
                                        value={jumpToIndex}
                                        onChange={(e) =>
                                            setJumpToIndex(e.target.value)
                                        }
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                jumpToApplicant()
                                            }
                                        }}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder={`1-${applicants.length}`}
                                        autoFocus
                                    />
                                </div>
                                <button
                                    onClick={jumpToApplicant}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Jump
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    {/* Applicant Details - Compact */}
                    <div className="xl:col-span-1 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Applicant Details
                            </h2>
                            <div className="flex gap-2">
                                {statuses[currentIndex] === 'selected' && (
                                    <span className="bg-emerald-100 border border-emerald-200 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
                                        Selected
                                    </span>
                                )}
                                {statuses[currentIndex] === 'rejected' && (
                                    <span className="bg-red-100 border border-red-200 text-red-700 px-2 py-1 rounded text-xs font-medium">
                                        Rejected
                                    </span>
                                )}
                                {statuses[currentIndex] === 'skipped' && (
                                    <span className="bg-amber-100 border border-amber-200 text-amber-700 px-2 py-1 rounded text-xs font-medium">
                                        Skipped
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            {Object.entries(currentApplicant).slice(0, 6).map(
                                ([key, value]) => {
                                    if (
                                        key.toLowerCase().includes('resume') ||
                                        key.toLowerCase().includes('url')
                                    ) {
                                        return null
                                    }

                                    const icon = key
                                        .toLowerCase()
                                        .includes('email')
                                        ? Mail
                                        : key.toLowerCase().includes('phone')
                                          ? Phone
                                          : key
                                                  .toLowerCase()
                                                  .includes('address') ||
                                              key
                                                  .toLowerCase()
                                                  .includes('location')
                                            ? MapPin
                                            : key.toLowerCase().includes('date')
                                              ? Calendar
                                              : User

                                    return (
                                        <div
                                            key={key}
                                            className="flex items-start gap-2"
                                        >
                                            <div className="flex-shrink-0 w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                                                {React.createElement(icon, {
                                                    className:
                                                        'w-3 h-3 text-slate-600',
                                                })}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-slate-500 capitalize truncate">
                                                    {key
                                                        .replace(
                                                            /([A-Z])/g,
                                                            ' $1'
                                                        )
                                                        .trim()}
                                                </div>
                                                <div className="text-slate-800 font-medium text-sm truncate">
                                                    {typeof value ===
                                                        'string' ||
                                                    typeof value === 'number'
                                                        ? value
                                                        : JSON.stringify(value)}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            )}
                        </div>

                        {/* Action Buttons - Compact */}
                        <div className="space-y-2 mb-4">
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() =>
                                        updateStatus(currentIndex, 'selected')
                                    }
                                    className={`flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                                        statuses[currentIndex] === 'selected'
                                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                            : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 border border-slate-200'
                                    }`}
                                >
                                    <Check className="w-4 h-4" />
                                    <span className="hidden sm:inline">Select</span>
                                    <kbd className="ml-1 px-1 py-0.5 bg-slate-200 rounded text-xs">
                                        S
                                    </kbd>
                                </button>
                                <button
                                    onClick={() =>
                                        updateStatus(currentIndex, 'rejected')
                                    }
                                    className={`flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                                        statuses[currentIndex] === 'rejected'
                                            ? 'bg-red-100 text-red-700 border border-red-200'
                                            : 'bg-slate-100 hover:bg-red-50 text-slate-700 border border-slate-200'
                                    }`}
                                >
                                    <X className="w-4 h-4" />
                                    <span className="hidden sm:inline">Reject</span>
                                    <kbd className="ml-1 px-1 py-0.5 bg-slate-200 rounded text-xs">
                                        R
                                    </kbd>
                                </button>
                                <button
                                    onClick={() =>
                                        updateStatus(currentIndex, 'skipped')
                                    }
                                    className={`flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                                        statuses[currentIndex] === 'skipped'
                                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                            : 'bg-slate-100 hover:bg-amber-50 text-slate-700 border border-slate-200'
                                    }`}
                                >
                                    <SkipForward className="w-4 h-4" />
                                    <span className="hidden sm:inline">Skip</span>
                                    <kbd className="ml-1 px-1 py-0.5 bg-slate-200 rounded text-xs">
                                        K
                                    </kbd>
                                </button>
                            </div>
                            <button
                                onClick={() => toggleStar(currentIndex)}
                                className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    starred.has(currentIndex)
                                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                        : 'bg-slate-100 hover:bg-amber-50 text-slate-700 border border-slate-200'
                                }`}
                            >
                                <Star
                                    className={`w-4 h-4 ${starred.has(currentIndex) ? 'fill-amber-500' : ''}`}
                                />
                                {starred.has(currentIndex)
                                    ? 'Starred'
                                    : 'Star for Later'}{' '}
                                <kbd className="ml-1 px-1 py-0.5 bg-slate-200 rounded text-xs">
                                    F
                                </kbd>
                            </button>
                        </div>

                        {/* Navigation - Compact */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => navigateApplicant('prev')}
                                    disabled={currentIndex === 0}
                                    className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 rounded-lg transition-colors text-sm"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span className="hidden sm:inline">Previous</span>
                                </button>
                                <div className="text-slate-600 text-sm">
                                    {currentIndex + 1} of {applicants.length}
                                </div>
                                <button
                                    onClick={() => navigateApplicant('next')}
                                    disabled={
                                        currentIndex === applicants.length - 1
                                    }
                                    className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 rounded-lg transition-colors text-sm"
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Progress Bar - Compact */}
                            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
                                    style={{
                                        width: `${((currentIndex + 1) / applicants.length) * 100}%`,
                                    }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>
                                    {Math.round(
                                        ((currentIndex + 1) /
                                            applicants.length) *
                                            100
                                    )}
                                    % reviewed
                                </span>
                                <span>
                                    {applicants.length - currentIndex - 1}{' '}
                                    remaining
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Resume Viewer - Compact */}
                    <div className="xl:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200">
                       

                        <div className="h-[calc(100vh-200px)] bg-slate-50 rounded-lg border border-slate-200">
                            {currentApplicant['Resume '] ? (
                                <iframe
                                 
                                    src={`https://drive.google.com/file/d/${currentApplicant['Resume '].split('?id=').pop()}/preview?embedded=true`}
                                    className="w-full h-full rounded-lg"
                                    title="Resume"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400">
                                    <div className="text-center">
                                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p className="text-sm">No resume URL found</p>
                                        <p className="text-xs mt-1 text-slate-500">
                                            Make sure your Excel file has a
                                            column with resume URLs
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </div>
        </div>
    )
}
