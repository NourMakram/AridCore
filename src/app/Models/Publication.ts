export interface Publication{
    id:number,
    fileLinkPath:string,
    publicationType: string,
    arTitle:string,
    enTitle:string,
    arAuthors : string,
    enAuthors:string,
    arAbstract: string,
    enAbstract:string,
    publicationDate: string,
    publisher:string,
    volumeNo: number,
    issueNo: number,
    issn: string,
    doi:string,
    pages: string,
    externalLink: string,
    downloadHits: number,
    keywords:string,
}