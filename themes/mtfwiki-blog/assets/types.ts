declare global {
  interface ServiceWorkerRegistration {
    index: ContentIndex
  }

  interface ContentIndex {
    add(description: ContentDescription): Promise<void>
    delete(id: ContentDescription['id']): Promise<void>
    getAll(): Promise<ContentDescription[]>
  }

  interface ContentDescription {
    readonly id: string
    readonly url: string
    readonly title: string
    readonly description: string
    readonly category?: '' | 'homepage' | 'article' | 'video' | 'audio'
    readonly icons?: ContentIcon[]
  }

  interface ContentIcon {
    readonly src: string
    readonly sizes: string
    readonly type: string
  }
}

export {}
