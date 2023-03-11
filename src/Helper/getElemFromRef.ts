export default function getElem<T>(ref: React.RefObject<T>): T {
    const elem = ref.current
    if (elem === null) throw Error()
    return elem
}