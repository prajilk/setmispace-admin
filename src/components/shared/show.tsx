import { Children, PropsWithChildren } from "react";

export const Show = (props: PropsWithChildren) => {
    let when: React.ReactNode | null = null;
    let otherwise = null;

    Children.forEach(props.children, (children) => {
        // @ts-ignore
        if (children?.props.isTrue === undefined) {
            otherwise = children;
            // @ts-ignore
        } else if (!when && children?.props.isTrue === true) {
            when = children;
        }
    });

    return when || otherwise;
};

Show.When = ({
    isTrue,
    children,
}: {
    isTrue: boolean;
    children: React.ReactNode;
}) => isTrue && children;
Show.Else = ({ children }: { children: React.ReactNode }) => children;
