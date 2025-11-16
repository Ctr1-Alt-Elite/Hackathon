package io.github.ctrl_alt_elite.hackathon.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * DTO for main entity Article
 */

@Schema(name = "ArticleDTO", description = "DTO for main entity Article")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-11-16T14:24:29.363983+03:00[Europe/Moscow]", comments = "Generator version: 7.8.0")
public class ArticleDTO {

  private String title;

  private String author;

  @Valid
  private List<String> tags = new ArrayList<>();

  private String text;

  public ArticleDTO() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public ArticleDTO(String title, List<String> tags, String text) {
    this.title = title;
    this.tags = tags;
    this.text = text;
  }

  public ArticleDTO title(String title) {
    this.title = title;
    return this;
  }

  /**
   * Get title
   * @return title
   */
  @NotNull 
  @Schema(name = "title", example = "article1", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("title")
  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public ArticleDTO author(String author) {
    this.author = author;
    return this;
  }

  /**
   * Get author
   * @return author
   */
  
  @Schema(name = "author", example = "0x35686896756", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("author")
  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public ArticleDTO tags(List<String> tags) {
    this.tags = tags;
    return this;
  }

  public ArticleDTO addTagsItem(String tagsItem) {
    if (this.tags == null) {
      this.tags = new ArrayList<>();
    }
    this.tags.add(tagsItem);
    return this;
  }

  /**
   * Get tags
   * @return tags
   */
  @NotNull 
  @Schema(name = "tags", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("tags")
  public List<String> getTags() {
    return tags;
  }

  public void setTags(List<String> tags) {
    this.tags = tags;
  }

  public ArticleDTO text(String text) {
    this.text = text;
    return this;
  }

  /**
   * Get text
   * @return text
   */
  @NotNull 
  @Schema(name = "text", example = "Lorem impsum", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("text")
  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ArticleDTO articleDTO = (ArticleDTO) o;
    return Objects.equals(this.title, articleDTO.title) &&
        Objects.equals(this.author, articleDTO.author) &&
        Objects.equals(this.tags, articleDTO.tags) &&
        Objects.equals(this.text, articleDTO.text);
  }

  @Override
  public int hashCode() {
    return Objects.hash(title, author, tags, text);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ArticleDTO {\n");
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
    sb.append("    author: ").append(toIndentedString(author)).append("\n");
    sb.append("    tags: ").append(toIndentedString(tags)).append("\n");
    sb.append("    text: ").append(toIndentedString(text)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

