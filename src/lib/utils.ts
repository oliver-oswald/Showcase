export const serializeNonPOJOs: any = (obj: any) => {
    return structuredClone(obj);
}