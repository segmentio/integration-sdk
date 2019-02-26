export interface ContextData {
  [key: string]: string | number | this
}

export interface eVars {
  eVar1?: string
  eVar2?: string
  eVar3?: string
  eVar4?: string
  eVar5?: string
  eVar6?: string
  eVar7?: string
  eVar8?: string
  eVar9?: string
  eVar10?: string
  eVar11?: string
  eVar12?: string
  eVar13?: string
  eVar14?: string
  eVar15?: string
  eVar16?: string
  eVar17?: string
  eVar18?: string
  eVar19?: string
  eVar20?: string
  eVar21?: string
  eVar22?: string
  eVar23?: string
  eVar24?: string
  eVar25?: string
  eVar26?: string
  eVar27?: string
  eVar28?: string
  eVar29?: string
  eVar30?: string
  eVar31?: string
  eVar32?: string
  eVar33?: string
  eVar34?: string
  eVar35?: string
  eVar36?: string
  eVar37?: string
  eVar38?: string
  eVar39?: string
  eVar40?: string
  eVar41?: string
  eVar42?: string
  eVar43?: string
  eVar44?: string
  eVar45?: string
  eVar46?: string
  eVar47?: string
  eVar48?: string
  eVar49?: string
  eVar50?: string
  eVar51?: string
  eVar52?: string
  eVar53?: string
  eVar54?: string
  eVar55?: string
  eVar56?: string
  eVar57?: string
  eVar58?: string
  eVar59?: string
  eVar60?: string
  eVar61?: string
  eVar62?: string
  eVar63?: string
  eVar64?: string
  eVar65?: string
  eVar66?: string
  eVar67?: string
  eVar68?: string
  eVar69?: string
  eVar70?: string
  eVar71?: string
  eVar72?: string
  eVar73?: string
  eVar74?: string
  eVar75?: string
}

export interface Payload extends eVars {
  /**
   * Browser height in pixels (For example, 768).
   */
  browserHeight?: string
  /**
   * 	Browser width in pixels (For example, 1024).
   */
  browserWidth?: string
  /**
   * The campaign tracking code associated with the page.
   */
  campaign?: string
  /**
   * The page title or bread crumb.
   */
  channel?: string
  colorDepth?: string
  contextData?: ContextData
}
