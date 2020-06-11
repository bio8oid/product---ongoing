import React from "react";
import SEO from "../components/Seo/seo";
import styled from 'styled-components';
import { theme } from '../utils/theme';
import Spinner from "../components/Spinner/Spinner";
import Layout from "../components/Layout/Layout";
import MultiButton from "../components/MultiButton/MultiButton";
import { StyledHomeButton, StyledContactButton } from "../components/MultiButton/MultiButton";
import Slider from "../components/Slider/Slider";
import useFetch from "../components/useFetch/useFetch";
import useRouteData from "../components/useRouteData/useRouteData";
import PropertyContent from "../components/PropertyContent/PropertyContent";

// ---- Images ----

import route404 from "../images/404.webp";
import cloud3 from "../images/cloud_3.webp";

// ---- Property View Styles ----

const StyledPropertyDescription = styled.div`
${theme.flex.centeredColumn};
background : white;
min-height: 45vh;
position: fixed;
bottom: 0;
left: 0;
right: 0;
margin: 0;

p {
    font-size: 1.25rem;
    font-weight: bolder;
}

${theme.media.cloud} {
    height: 51vh;
}

${theme.media.desktop} {
    min-height: 58vh;
}

${theme.media.tabletPro} {
    min-height: 60vh;
}

${theme.media.tablet} {
    min-height: 70vh;
}

${theme.media.mobile} {
    position: static;
    opacity: .9;
}
`
const StyledBackgroundImage = styled.div`
position: absolute;
max-height: 46vh;
z-index: -1;

img {
    position: relative;
    max-width: 100%;
    opacity: .6;
}
`
const StyledContainerWrapper = styled.div`
${theme.flex.centered};
text-align: center;

${theme.media.mobile} {
    flex-direction: column;
}
`
const StyledContainerCenter = styled.div`
text-align: center;
width: 70vw;

h3 {
    font-size: 2.5rem;
    margin: 0;
}

p {
    font-size: 1.5rem;
}
`
const StyledColumn = styled.div`
width: 35vw;

${theme.media.tablet} {
    width: 50vw;
}

${theme.media.mobile} {
    p {
        font-size: 1rem;
    };
}
`

const PropertyView = props => {

    const routeData = useRouteData(props);

    const query = `query Properties($string: String) {
            properties(filter: $string) {
                id
                title
                desc
                price
                location
                availability
                deposit
                commission
                factor
                img
            }
        }`

    const res = useFetch(query, routeData.propertyId);

    const loading = res.loading;
    const propertyContent = res.pageContent.length === 0 ? [{ img: [`${route404}`] }] : res.pageContent;

    return (
        <Layout>
            <SEO title="Property" />

            {loading ? <Spinner /> : <Slider propertyContent={propertyContent} />}

            <PropertyContent propertyContent={propertyContent} routeData={routeData} />

            {/* {propertyContent.map(x => (
                <StyledPropertyDescription index={x.id} key={Math.random()} >

                    <StyledBackgroundImage>
                        <img src={cloud3} alt="cloud3" />
                    </StyledBackgroundImage>

                    <StyledContainerCenter>
                        <h3>{x.title}</h3>
                        <p>{x.desc}</p>
                    </StyledContainerCenter>

                    <StyledContainerWrapper>
                        <StyledColumn>
                            <p>LOCATION : {x.location}</p>
                            <p>AVAILABLE : {x.availability}</p>
                            <p>FACTOR : {x.factor}</p>
                        </StyledColumn>

                        <StyledContactButton>
                            <MultiButton state={{ route: routeData.routeTag, id: routeData.propertyId, pathname: "/contact", buttonType: "chat" }} />
                        </StyledContactButton>

                        <StyledColumn>
                            <p>DEPOSIT : {x.deposit}</p>
                            <p>COMMISSION : {x.commission}</p>
                            <p>RENT PRICE : {x.price} £ PM</p>
                        </StyledColumn>

                    </StyledContainerWrapper>
                </StyledPropertyDescription>
            ))} */}

            <StyledHomeButton>
                <MultiButton state={{ id: routeData.propertyId, pathname: "/", buttonType: "home" }} />
            </StyledHomeButton>

            <MultiButton state={{ route: routeData.routeTag, id: routeData.propertyId, pathname: "/propertiesList" }} />

        </Layout>
    )
}

export default PropertyView;