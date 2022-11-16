import { useEffect, useRef, useState } from "react";

export default function useIntersect({ root = null, rootMargin = "100% 0px 100% 0px", threshold = 0}){
  const [rootNode, setRoot] = useState(root);
  const [node, setNode] = useState("");
  const [entry, setEntry] = useState(null);
  const observer = useRef(null);
  useEffect(() => {
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                        if(entry.isIntersecting){
                                setEntry(entry)
                        }
                })
        }, {rootNode, rootMargin, threshold})
                
        const { current: currentObserver } = observer;
        
        if (node){
                try {
                    node.forEach(element => {
                        currentObserver.observe(element)
                    });
                }
                catch(e) {
                        currentObserver.observe(node)
                }
        }
        return () => currentObserver.disconnect()

    }, [rootNode, node, rootMargin, threshold])

  return [entry, setRoot, setNode];
};